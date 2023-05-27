export const APP_NAME_KEY = "SOME_AWESOME_TOOL";
export const REPLACEMENT_MAP_KEY = `${APP_NAME_KEY}-replacement-map`;
export const SELECTED_LANGUAGE_KEY = `${APP_NAME_KEY}-selected-language`;
export const DEFAULT_LANGUAGE = "vi";
export const API_DOMAIN =
  process.env.NODE_ENV === "production"
    ? "https://some-awesome-apps.vercel.app"
    : "http://localhost:3000";
