import "server-only";
import { LocaleType } from "../i18n.config";
import { Languages } from "../constance/enums";

const dictionaries = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  ar: () => import("../dictionaries/ar.json").then((module) => module.default),
};

const getDictionary = async (locale: LocaleType) => {
  return locale === Languages.ENGLISH ? dictionaries.en() : dictionaries.ar();
};
export default getDictionary;
