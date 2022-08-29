<template>
  <a
    :href="href"
    target="_blank"
    :class="$style.link"
  >
    <span :class="$style.text">
      <slot />
    </span>
    <IconExternalLink :class="$style.icon" />
  </a>
</template>
<script setup lang="ts">
defineProps({
  href: {
    type: String,
    required: true
  }
});
</script>
<style lang="scss" module>
@use '~/assets/sass/mixins' as *;

.link {
  @include inline-flex;
  font-size: rem(16px);
  font-weight: 700;
  color: var(--text-primary);
}

.text {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 100%;
    width: 0;
    height: 2px;
    background-color: var(--text-secondary);
    @include transition;
  }
}

.icon {
  flex-shrink: 0;
  margin-left: rem(5px);
  @include size(18px, 18px);
  color: var(--text-secondary);
}

.link:hover {
  .text {
    &::after {
      width: 100%;
    }
  }

  .icon {
    animation-name: swing;
    animation-duration: 700ms;
  }
}

@keyframes swing {
  20% {
    transform: rotate3d(0, 0, 1, 15deg);
  }

  40% {
    transform: rotate3d(0, 0, 1, -10deg);
  }

  60% {
    transform: rotate3d(0, 0, 1, 5deg);
  }

  80% {
    transform: rotate3d(0, 0, 1, -5deg);
  }

  to {
    transform: rotate3d(0, 0, 1, 0deg);
  }
}
</style>
