import EditUserForm from "@/components/edit-user-form";
import { Pages, Routes } from "@/constants/enums";
import { LocaleType } from "@/i18n.config";

import { getUser, getUsers } from "@/server/db/users";
import { redirect } from "next/navigation";
import getDictionary from "../../../../../../lib/dictionaries";

export async function generateStaticParams() {
  const users = await getUsers();

  return users.map((user) => ({ userId: user.id }));
}

async function EditUserPage({
  params,
}: {
  params: Promise<{ userId: string; locale: LocaleType }>;
}) {
  const { locale, userId } = await params;
  const translations = await getDictionary(locale);
  const user = await getUser(userId);
  if (!user) {
    redirect(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`);
  }
  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <EditUserForm translations={translations} user={user} />
        </div>
      </section>
    </main>
  );
}

export default EditUserPage;
