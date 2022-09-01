<template>
  <div :class="$style.app">
    <NuxtLayout :key="$route.path">
      <NuxtPage :key="$route.path" />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Ls, Keys } from "@/const";
import type { UserTheme, Languages } from "@/types";

const route = useRoute();
const { locale, t } = useI18n();

// тема
const colorScheme = usePreferredColorScheme();
const userTheme = useCookie<UserTheme>(Ls.THEME);

const updateTheme = (theme: UserTheme) => {
  userTheme.value = theme;
};
provide(Keys.THEME, {
  userTheme,
  updateTheme
});

watch([userTheme, colorScheme], () => {
  if (!userTheme.value && colorScheme.value !== "no-preference") {
    userTheme.value = colorScheme.value;
  }
});

onMounted(() => {
  watch(colorScheme, () => {
    if (colorScheme.value !== "no-preference") {
      userTheme.value = colorScheme.value;
    }
  });
});

// язык
const language = useCookie<Languages>(Ls.LANGUAGE);
language.value = language.value || locale.value as Languages;
const updateLanguage = (value: Languages) => {
  language.value = value;
};
watch(language, () => {
  locale.value = language.value;
}, { immediate: true });

provide(Keys.LANGUAGE, {
  language,
  updateLanguage
});

// head
const title = computed(() => t(`${route.name?.toString()}.title`));

const htmlAttrs = computed(() => ({
  lang: locale.value,
  class: userTheme.value
}));

useHead({
  title,
  htmlAttrs
});
</script>
<style lang="scss" module>
.app {
  min-height: 100vh;
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  background-color: var(--background-primary);
  color: var(--text-primary);
  overflow: hidden;
}
</style>
