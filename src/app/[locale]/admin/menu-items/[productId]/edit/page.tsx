import { Pages, Routes } from "@/constants/enums";
import { LocaleType } from "@/i18n.config";
import { getProduct, getProducts } from "@/server/db/products";
import { redirect } from "next/navigation";
import Form from "../../_components/Form";
import { getCategories } from "@/server/db/categories";
import getDictionary from "@/lib/dictionaries";

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({ productId: product.id }));
}
async function EditProductPage({
  params,
}: {
  params: Promise<{ locale: LocaleType; productId: string }>;
}) {
  const { productId, locale } = await params;
  const translations = await getDictionary(locale);
  const product = await getProduct(productId);
  const categories = await getCategories();

  if (!product) {
    redirect(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`);
  }

  return (
    <main>
      <section>
        <div className="container">
          <Form
            categories={categories}
            translations={translations}
            product={product}
          />
        </div>
      </section>
    </main>
  );
}

export default EditProductPage;
