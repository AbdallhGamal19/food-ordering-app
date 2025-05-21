import { Routes } from "../../constance/enums";
import getDictionary from "../../lib/dictionaries";
import { getCurrentLocale } from "../../lib/getCurrentLocale";
import MainHeading from "../mainHeading/index";

const Contact = async () => {
  const locale = await getCurrentLocale();
  const { home } = await getDictionary(locale);
  const { contact } = home;
  return (
    <section className="section-gap" id={Routes.CONTACT}>
      <div className="container text-center">
        <MainHeading
          subtitle={contact["Don'tHesitate"]}
          title={contact.contactUs}
        />
        <div className="mt-8">
          <a className="text-4xl underline text-accent" href="tel:+2012121212">
            +2012121212
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
