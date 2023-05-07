import en from "../../public/locales/en/common.json";
import vi from "../../public/locales/vi/common.json";

export const getTrans = (locale: string) => {
  const trans = locale === "vi" ? vi : en;
  return trans;
};
