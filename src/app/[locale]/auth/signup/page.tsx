import Link from "@/components/Link/index";
import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constance/enums";
import { LocaleType } from "@/i18n.config";
import getdictionary from "@/lib/dictionaries";
import Form from "./_components/Form";

async function SignupPage({
  params,
}: {
  params: Promise<{ locale: LocaleType }>;
}) {
  const { locale } = await params;
  const translations = await getdictionary(locale);
  return (
    <main>
      <div className="py-44 md:py-40 bg-gray-50 element-center">
        <div className="container element-center">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center text-black mb-4">
              {translations.auth.register.title}
            </h2>
            <Form translations={translations} />
            <p className="mt-2 flex items-center justify-center text-accent text-sm">
              <span>{translations.auth.register.authPrompt.message}</span>
              <Link
                href={`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`}
                className={`${buttonVariants({
                  variant: "link",
                  size: "sm",
                })} !text-black`}
              >
                {translations.auth.register.authPrompt.loginLinkText}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignupPage;
