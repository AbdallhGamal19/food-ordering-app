import { Routes } from "../../constance/enums";
import getDictionary from "../../lib/dictionaries";
import { getCurrentLocale } from "../../lib/getCurrentLocale";
import MainHeading from "../mainHeading/index";

async function About() {
  const locale = await getCurrentLocale();
  const { home } = await getDictionary(locale);
  const { about } = home;
  return (
    <section className="section-gap" id={Routes.ABOUT}>
      <div className="container text-center">
        <MainHeading subtitle={about.ourStory} title={about.aboutUs} />
        <div className="text-accent max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>{about.descriptions.one}</p>
          <p>{about.descriptions.two}</p>
          <p>{about.descriptions.three}</p>
        </div>
      </div>
    </section>
  );
}

export default About;
