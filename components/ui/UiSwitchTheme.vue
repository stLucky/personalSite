<template>
  <button
    type="button"
    :class="$style.switch"
    @click="toggleTheme"
  >
    <span :class="toggleCl">
      <svg
        v-if="userTheme === 'dark'"
        xmlns="http://www.w3.org/2000/svg"
        class="icon fill-current"
        fill="currentColor"
        viewBox="0 0 24 24"
        stroke-width="2"
        :class="$style.icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        :class="$style.icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    </span>
  </button>
</template>
<script setup lang="ts">
import { Ls } from "@/const";
type UserTheme = "light" | "dark"

const setTheme = (theme: UserTheme) => {
  localStorage.setItem(Ls.THEME, theme);
  userTheme.value = theme;
  document.documentElement.className = theme;
};

const getTheme = (): UserTheme =>
  process.client ? localStorage.getItem(Ls.THEME) as UserTheme : "dark";

const toggleTheme = (): void => {
  const activeTheme = localStorage.getItem(Ls.THEME);

  if (activeTheme === "light") {
    setTheme("dark");
  } else {
    setTheme("light");
  }
};

const getMediaPreference = (): UserTheme | undefined => {
  const hasDarkPreference = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (hasDarkPreference) {
    return "dark";
  } else {
    return "light";
  }
};

const $style = useCssModule();
const toggleCl = computed(() => ({
  [$style.toggle]: true,
  [$style.toggleChecked]: userTheme.value === "light"
}));

const userTheme = ref<UserTheme>(getTheme() || getMediaPreference());

onMounted(() => setTheme(userTheme.value));
</script>
<style lang="scss" module>
@use '~/assets/sass/mixins' as *;

.switch {
  display: inline-flex;
  position: relative;
  padding: 0;
  border: none;
  border-radius: 11px;
  width: 40px;
  height: 22px;
  background-color: var(--text-primary);
  @include transition;

  &:hover {
    cursor: pointer;
  }
}

.toggle {
  @include flex;
  position: absolute;
  top: 50%;
  left: 1px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: var(--background-primary);
  transform: translateY(-50%);
  transition: background-color .25s, transform .25s;

  &Checked {
    transform: translate(100%, -50%);
  }
}

.icon {
  width: 12px;
  height: 12px;
  color: var(--text-primary);
}
</style>
