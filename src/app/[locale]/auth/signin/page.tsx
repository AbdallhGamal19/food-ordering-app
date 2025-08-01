import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "../../../../constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import Form from "./_components/Form";
import getTrans from "../../../../lib/dictionaries";
import Link from "../../../../components/Link/index";

async function SigninPage() {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);
  return (
    <main>
      <div className="py-44 md:py-40 bg-gray-50 element-center">
        <div className="container element-center">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center text-black mb-4">
              {translations.auth.login.title}
            </h2>
            <p className="text-center text-[12px] text-red-400">
              Please login with this admin email to access all features
            </p>
            <Form translations={translations} />
            <p className="mt-2 flex items-center justify-center text-accent text-sm">
              <span>{translations.auth.login.authPrompt.message}</span>
              <Link
                href={`/${locale}/${Routes.AUTH}/${Pages.Register}`}
                className={`${buttonVariants({
                  variant: "link",
                  size: "sm",
                })} !text-black`}
              >
                {translations.auth.login.authPrompt.signUpLinkText}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SigninPage;
