import { headers } from "next/headers.js";
import { LocaleType } from "../i18n.config";

export const getCurrentLocale = async () => {
  const url = (await headers()).get("x-url");
  const locale = url?.split("/")[3] as LocaleType;
  return locale;
};
