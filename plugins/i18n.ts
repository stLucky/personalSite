import { createI18n } from "vue-i18n";
import ru from "@/locales/ru.json";
import en from "@/locales/en.json";

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "ru",
    messages: {
      en,
      ru
    }
  });

  vueApp.use(i18n);
});
