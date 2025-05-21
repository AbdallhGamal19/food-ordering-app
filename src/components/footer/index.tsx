import { getCurrentLocale } from "@/lib/getCurrentLocale";

import getDictionary from "../../lib/dictionaries";

const Footer = async () => {
  const locale = await getCurrentLocale();
  const { copyRight } = await getDictionary(locale);
  return (
    <footer className="border-t p-8 text-center text-accent">
      <div className="container">
        <p>{copyRight}</p>
      </div>
    </footer>
  );
};

export default Footer;
