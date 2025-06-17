"use server";
import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/lib/prisma";
import getDictionary from "@/lib/dictionaries";
import { updateProfileSchema } from "@/validations/profile";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const updateProfile = async (
  isAdmin: boolean,
  prevState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale();
  const translations = await getDictionary(locale);
  const result = updateProfileSchema(translations).safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      formData,
    };
  }
  const data = result.data;
  const imageFile = data.image as File;
  const imageUrl = Boolean(imageFile.size)
    ? await getImageUrl(imageFile)
    : undefined;

  try {
    const user = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      return {
        message: translations.messages.userNotFound,
        status: 401,
        formData,
      };
    }
    await db.user.update({
      where: {
        email: user.email,
      },
      data: {
        ...data,
        image: imageUrl ?? user.image,
        role: isAdmin ? UserRole.ADMIN : UserRole.USER,
      },
    });
    revalidatePath(`/${locale}/${Routes.PROFILE}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`);
    revalidatePath(
      `/${locale}/${Routes.ADMIN}/${Pages.USERS}/${user.id}/${Pages.EDIT}`
    );
    return {
      status: 200,
      message: translations.messages.updateProfileSucess,
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
  formData.append("pathName", "profile_images");

  try {
    const response = await fetch(uploadApiUrl, {
      method: "POST",
      body: formData,
    });
    const image = (await response.json()) as { url: string };
    return image.url;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
  }
};
