"use server";

import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/lib/prisma";
import { addProductSchema, updateProductSchema } from "@/validations/product";
import { Extra, ExtraIngredients, ProductSizes, Size } from "@prisma/client";
import { revalidatePath } from "next/cache";
import getDictionary from "../../../../../lib/dictionaries";
import { headers } from "next/headers";

export const addProduct = async (
  args: {
    categoryId: string;
    options: { sizes: Partial<Size>[]; extras: Partial<Extra>[] };
  },
  prevState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale();
  const translations = await getDictionary(locale);
  const result = addProductSchema(translations).safeParse(
    Object.fromEntries(formData.entries())
  );

  const maxOrder = await db.product.aggregate({
    _max: { order: true },
  });

  const nextOrder = (maxOrder._max.order ?? 0) + 1;
  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400,
      formData,
    };
  }
  const data = result.data;
  const basePrice = Number(data.basePrice);
  const imageFile = data.image as File;
  const imageUrl = Boolean(imageFile.size)
    ? await getImageUrl(imageFile)
    : undefined;

  try {
    if (imageUrl) {
      const product = await db.product.create({
        data: {
          ...data,
          image: imageUrl,
          basePrice,
          categoryId: args.categoryId,
          order: nextOrder,
        },
      });

      if (args.options.sizes.length > 0) {
        await db.size.createMany({
          data: args.options.sizes.map((size) => ({
            productId: product.id,
            name: size.name as ProductSizes,
            price: Number(size.price),
          })),
        });
      }

      if (args.options.extras.length > 0) {
        await db.extra.createMany({
          data: args.options.extras.map((extra) => ({
            productId: product.id,
            name: extra.name as ExtraIngredients,
            price: Number(extra.price),
          })),
        });
      }

      revalidatePath(`/${locale}/${Routes.MENU}`);
      revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`);
      revalidatePath(`/${locale}`);
      return {
        status: 201,
        message: translations.messages.productAdded,
      };
    }
    return {};
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: translations.messages.unexpectedError,
    };
  }
};

export const updateProduct = async (
  args: {
    productId: string;
    options: { sizes: Partial<Size>[]; extras: Partial<Extra>[] };
  },
  prevState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale();
  const translations = await getDictionary(locale);
  const result = updateProductSchema(translations).safeParse(
    Object.fromEntries(formData.entries())
  );
  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400,
      formData,
    };
  }
  const data = result.data;
  const basePrice = Number(data.basePrice);
  const imageFile = data.image as File;
  const imageUrl = Boolean(imageFile.size)
    ? await getImageUrl(imageFile)
    : undefined;

  const product = await db.product.findUnique({
    where: { id: args.productId },
  });

  if (!product) {
    return {
      status: 400,
      message: translations.messages.unexpectedError,
    };
  }
  try {
    const updatedProduct = await db.product.update({
      where: {
        id: args.productId,
      },
      data: {
        ...data,
        basePrice,
        image: imageUrl ?? product.image,
      },
    });

    await db.size.deleteMany({
      where: { productId: args.productId },
    });

    if (args.options.sizes.length > 0) {
      await db.size.createMany({
        data: args.options.sizes.map((size) => ({
          productId: args.productId,
          name: size.name as ProductSizes,
          price: Number(size.price),
        })),
      });
    }

    await db.extra.deleteMany({
      where: { productId: args.productId },
    });

    if (args.options.extras.length > 0) {
      await db.extra.createMany({
        data: args.options.extras.map((extra) => ({
          productId: args.productId,
          name: extra.name as ExtraIngredients,
          price: Number(extra.price),
        })),
      });
    }

    revalidatePath(`/${locale}/${Routes.MENU}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`);
    revalidatePath(
      `/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${updatedProduct.id}/${Pages.EDIT}`
    );
    revalidatePath(`/${locale}`);
    return {
      status: 200,
      message: translations.messages.updateProductSucess,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: translations.messages.unexpectedError,
    };
  }
};

const getImageUrl = async (imageFile: File) => {
  const headersList = headers();
  const protocol = (await headersList).get("x-forwarded-proto") || "http";
  const host = (await headersList).get("host");
  const baseUrl = `${protocol}://${host}`;
  const uploadApiUrl = `${baseUrl}/api/upload`;
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("pathName", "product_images");

  try {
    const response = await fetch(uploadApiUrl, {
      method: "POST",
      body: formData,
    });
    console.log(response);
    const image = (await response.json()) as { url: string };
    return image.url;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
  }
};

export const deleteProduct = async (id: string) => {
  const locale = await getCurrentLocale();
  const translations = await getDictionary(locale);
  try {
    await db.product.delete({
      where: { id },
    });
    revalidatePath(`/${locale}/${Routes.MENU}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`);
    revalidatePath(
      `/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${id}/${Pages.EDIT}`
    );
    revalidatePath(`/${locale}`);
    return {
      status: 200,
      message: translations.messages.deleteProductSucess,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: translations.messages.unexpectedError,
    };
  }
};
