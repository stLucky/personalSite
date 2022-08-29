<template>
  <div>
    <button
      v-for="language of languages"
      :key="language"
      type="button"
      :class="[$style.btn, {[$style.active]: locale === language}]"
      @click="handleChangeLanguage(language)"
    >
      {{ language }}
    </button>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Ls } from "@/const";

const languages = ["ru", "en"] as const;
type Languages = typeof languages[number]

const { locale } = useI18n();

const setAppLanguage = (language: Languages) => {
  locale.value = language;
  document.documentElement.lang = language;
};
const setLsLanguage = (language: Languages) => {
  localStorage.setItem(Ls.LANGUAGE, language);
};

const handleChangeLanguage = (language: Languages) => {
  setAppLanguage(language);
  setLsLanguage(language);
};

const setLanguage = () => {
  const lsLanguage = localStorage.getItem(Ls.LANGUAGE) as Languages | undefined;

  if (lsLanguage) {
    setAppLanguage(lsLanguage);
  } else {
    setLsLanguage(locale.value as Languages);
  }
};

onMounted(() => setLanguage());
</script>
<style lang="scss" module>
@use '~/assets/sass/mixins' as *;

.btn {
  padding: 0;
  border: none;
  background-color: transparent;
  color: var(--text-primary);
  font-size: rem(14px);
  font-weight: 700;
  text-transform: uppercase;

  &:not(:last-child) {
    margin: 0 rem(5px) 0 0;
  }

  &:hover {
    cursor: pointer;
  }
}

.active {
  border-bottom: rem(2px) solid var(--text-secondary);
}
</style>
