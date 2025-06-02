import { Languages } from "./constants/enums";

export type LanguagesType = Languages.ENGLISH | Languages.ARABIC;
type i18nType = {
  defultLocale: LanguagesType;
  locales: LanguagesType[];
};

export const i18n: i18nType = {
  defultLocale: Languages.ARABIC,
  locales: [Languages.ENGLISH, Languages.ARABIC],
};

export type LocaleType = (typeof i18n)["locales"][number];
