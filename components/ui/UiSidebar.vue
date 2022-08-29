<template>
  <div :class="sidebarCl">
    <slot />
  </div>
</template>
<script setup lang="ts">
const $style = useCssModule();

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
});

const sidebarCl = computed(() => ({
  [$style.sidebar]: true,
  [$style.active]: props.active
}));

watch(
  () => props.active,
  (isActive: boolean) => {
    if (isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
);

onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>
<style lang="scss" module>
@use '~/assets/sass/global/variables' as *;
@use '~/assets/sass/mixins/display' as *;

.sidebar {
  position: fixed;
  inset: 0;
  z-index: $z-high;
  @include flex(center, center, column);
  color: var(--text-primary);

  transform: translate(-150%);
  transition: transform 0.5s ease-in-out;
  font-size: rem(14px);
  background-color: var(--background-primary);
}

.active {
  transform: translateX(0);
}
</style>
