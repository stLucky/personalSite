
import type { InjectionKey } from "vue";
import type { ProviderTheme, ProviderLanguages } from "@/types";

export default {
  THEME: Symbol("theme") as InjectionKey<ProviderTheme>,
  LANGUAGE: Symbol("language") as InjectionKey<ProviderLanguages>
} as const;
