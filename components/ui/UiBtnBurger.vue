<template>
  <button
    :aria-expanded="props.active ? 'true' : 'false'"
    :class="btnCl"
    :style="btnSt"
    aria-label="Menu"
    aria-controls="navigation"
  >
    <div
      v-for="index in 3"
      :key="index"
      :class="$style.bar"
      :style="barSt"
    />
  </button>
</template>

<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  barWidth: {
    type: Number,
    default: 18
  },
  barHeight: {
    type: Number,
    default: 2
  }
});

const $style = useCssModule();

const btnCl = computed(() => ({
  [$style.btn]: true,
  [$style.active]: props.active
}));

const btnSt = computed(() => ({
  width: props.barWidth + "px",
  height: props.barHeight * 6 + "px"
}));

const barSt = computed(() => ({
  width: props.barWidth + "px",
  height: props.barHeight + "px"
}));
</script>
<style lang="scss" module>
@use '~/assets/sass/mixins' as *;

.btn {
  appearance: none;
  @include flex(center, center, column);
  padding: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.bar {
  border-radius: 25px;
  background-color: var(--text-primary);
  transition: opacity .2s ease-in,
    transform .2s ease-out;

  &:nth-child(1) {
    transform: translateY(-75%);
  }

  &:nth-child(3) {
    transform: translateY(75%);
  }
}

.active {
  .bar {
    &:nth-child(2) {
      opacity: 0
    }

    &:nth-child(1) {
      transform: translateY(100%) rotate(45deg)
    }

    &:nth-child(3) {
      transform: translateY(-100%) rotate(-45deg)
    }
  }

}
</style>
