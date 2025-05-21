import getDictionary from "../../lib/dictionaries";
import { getCurrentLocale } from "../../lib/getCurrentLocale";
import Link from "../../Link/index";
import CartButton from "./cart-button";
import LanguageSwitcher from "./language-switcher";
import Navbar from "./Navbar";

const Header = async () => {
  const locale = await getCurrentLocale();
  const { logo, navbar } = await getDictionary(locale);
  return (
    <header className="py-4 md:py-6">
      <div className="container flex items-center justify-between ">
        <div className=" text-primary text-2xl font-semibold">
          <Link
            href={`/${locale}`}
            className="text-primary font-semibold text-2xl "
          >
            🍕 {logo}
          </Link>
        </div>
        <Navbar translations={navbar} />
        <LanguageSwitcher />
        <CartButton />
      </div>
    </header>
  );
};

export default Header;
