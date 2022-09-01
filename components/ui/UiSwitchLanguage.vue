<template>
  <div>
    <button
      v-for="item of Languages"
      :key="item"
      type="button"
      :class="[$style.btn, {[$style.active]: item === language}]"
      @click="updateLanguage(item)"
    >
      {{ item }}
    </button>
  </div>
</template>
<script setup lang="ts">
import { Keys, Languages } from "@/const";
import type { ProviderLanguages } from "@/types";

const { language, updateLanguage } = inject(Keys.LANGUAGE) as ProviderLanguages;
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
