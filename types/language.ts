import { CookieRef } from "#app";

export type Languages = "ru" | "en"

export type ProviderLanguages = {
  language: CookieRef<Languages>
  // eslint-disable-next-line no-unused-vars
  updateLanguage: (theme: Languages) => void
}
