"use client";
import { useState } from "react";
import { Pages, Routes } from "../../constance/enums";
import Link from "../../Link/index";
import { Button, buttonVariants } from "../ui/button";

import { useParams, usePathname } from "next/navigation.js";
import { Menu, XIcon } from "lucide-react";
const Navbar = ({
  translations,
}: {
  translations: { [key: string]: string };
}) => {
  const [openMenu, setOpenMenu] = useState(false);

  const { locale } = useParams();
  const pathname = usePathname();
  const links = [
    {
      id: crypto.randomUUID(),
      title: translations.menu,
      href: Routes.MENU,
    },
    {
      id: crypto.randomUUID(),
      title: translations.about,
      href: Routes.ABOUT,
    },
    {
      id: crypto.randomUUID(),
      title: translations.contact,
      href: Routes.CONTACT,
    },
  ];
  return (
    <nav className=" flex  flex-1 justify-end items-center   ">
      <Button
        variant={"secondary"}
        size={"sm"}
        className="lg:hidden "
        onClick={() => setOpenMenu(true)}
      >
        <Menu className="!w-6 !h-6" />
      </Button>
      <ul
        className={` fixed lg:static ${
          openMenu ? "z-50 left-0 " : "-left-full "
        }   top-0 px-10 py-20 lg:p-0 bg-background lg:bg-transparent transition-all duration-200  lg:h-auto flex-col lg:flex-row w-full lg:w-auto flex items-start lg:items-center gap-10`}
      >
        <Button
          variant={"secondary"}
          size={"sm"}
          className="lg:hidden absolute top-10 right-5 "
          onClick={() => setOpenMenu(false)}
        >
          <XIcon className="!w-6 !h-6" />
        </Button>
        {links.map((link) => (
          <li key={link.id}>
            <Link
              href={`/${locale}/${link.href}`}
              className={`${
                link.href.toString() === `${Routes.AUTH}/${Pages.LOGIN}`
                  ? `${buttonVariants({ size: "lg" })} !px-8 !rounded-full`
                  : `text-accent hover:text-primary duration-200 transition-colors  `
              } font-semibold ${
                pathname.startsWith(`/${locale}/${link.href}`)
                  ? "text-primary"
                  : "text-accent"
              }`}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
