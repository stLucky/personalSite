<template>
  <div :class="$style.switches">
    <UiSwitchLanguage :class="$style.switch" />
    <UiSwitchTheme :class="$style.switch" />
  </div>
</template>
<style lang="scss" module>
@use '~/assets/sass/mixins' as *;

.switches {
  @include flex(flex-start)
}

.switch {
  &:first-child {
    margin: 0 rem(15px) 0 0;
  }
}
</style>
