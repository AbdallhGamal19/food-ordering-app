import { Environments, Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getDictionary from "@/lib/dictionaries";
import { authOptions } from "@/server/auth";
import { UserRole } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Form from "../_components/Form";
import { getCategories } from "@/server/db/categories";

async function NewProductPage() {
  const session = await getServerSession(authOptions);
  const locale = await getCurrentLocale();
  const translations = await getDictionary(locale);
  const categories = await getCategories();

  if (!session) {
    redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
  }

  if (session && session.user.role !== UserRole.ADMIN) {
    redirect(`/${locale}/${Routes.PROFILE}`);
  }
  if (!categories || categories.length === 0) {
    redirect(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
  }
  return (
    <main>
      {process.env.NODE_ENV === Environments.PROD && (
        <div className="flex justify-center mt-2">
          <h2 className="text-red-500 text-center  w-1/2">
            We&apos;re sorry, you can&apos;t add the product in production mode
            because Cloudinary doesn&apos;t support this feature. To use it,
            please run the app in development mode.
          </h2>
        </div>
      )}
      <section className="section-gap">
        <div className="container">
          <Form translations={translations} categories={categories} />
        </div>
      </section>
    </main>
  );
}

export default NewProductPage;
