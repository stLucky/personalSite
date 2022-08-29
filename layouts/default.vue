<template>
  <TheHeader />
  <main class="container" :class="$style.main">
    <slot />
  </main>
  <TheFooter />
</template>
<style lang="scss" module>
@use '~/assets/sass/mixins' as *;
@use '~/assets/sass/global/variables' as *;

.main {
  width: 100%;
  @include flex;
  padding-top: rem(48px);
  position: relative;
  z-index: $z-middle;
}
</style>
