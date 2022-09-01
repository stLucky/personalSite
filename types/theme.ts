import { CookieRef } from "#app";

export type UserTheme = "light" | "dark"

export type ProviderTheme = {
  userTheme: CookieRef<UserTheme>
  // eslint-disable-next-line no-unused-vars
  updateTheme: (theme: UserTheme) => void
}
