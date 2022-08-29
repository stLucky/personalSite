<template>
  <div :class="$style.btns" v-bind="$attrs">
    <NuxtLink
      :to="Routes.Paths.about"
      class="btn btn--primary"
      :class="$style.btn"
    >
      {{ $t('about_me') }}
    </NuxtLink>
    <NuxtLink
      :to="Routes.Paths.portfolios"
      class="btn btn--secondary"
      :class="$style.btn"
    >
      {{ $t('see_portfolios') }}
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
import { Routes } from "@/helpers";
</script>
<style lang="scss" module>
@use '~/assets/sass/mixins' as *;

.btns {
  @include flex(flex-start);
}

.btn {
  &:first-child {
    margin-right: rem(10px);
  }
}
</style>
