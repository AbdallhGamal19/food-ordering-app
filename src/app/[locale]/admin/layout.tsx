import { LocaleType } from "@/i18n.config";

import AdminTabs from "./_components/AdminTabs";
import getDictionary from "../../../lib/dictionaries";

async function AdminLayout({
  params,
  children,
}: {
  params: Promise<{ locale: LocaleType }>;
  children: React.ReactNode;
}) {
  const locale = (await params).locale;
  const translations = await getDictionary(locale);
  return (
    <>
      <AdminTabs translations={translations} />
      {children}
    </>
  );
}

export default AdminLayout;
