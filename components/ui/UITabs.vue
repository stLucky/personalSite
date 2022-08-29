<template>
  <ul :class="$style.tabs">
    <li
      v-for="tab in tabs"
      :key="tab"
    >
      <button
        type="button"
        :class="tabCl(tab)"
        @click="handleChangeTab(tab)"
      >
        {{ tab }}
      </button>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { PropType } from "vue";

const $style = useCssModule();

const props = defineProps({
  tabs: {
    type: Array as PropType<string[]>,
    required: true
  },
  active: {
    type: String,
    required: true
  }
});

const emit = defineEmits(["update:active"]);

const tabCl = computed(() => (tab: string) => ({
  [$style.btn]: true,
  [$style.active]: props.active === tab
}));

const handleChangeTab = (tab: string) => {
  emit("update:active", tab);
};
</script>
<style lang="scss" module>
@use '~/assets/sass/global/variables' as *;
@use '~/assets/sass/mixins' as *;

.tabs {
  @include flex;
  flex-wrap: wrap;
}

.btn {
  border: none;
  border-bottom: 1px solid var(--text-secondary);
  opacity: 0.4;
  background-color: transparent;
  padding: rem(10px);
  color: var(--text-secondary);
  font-size: rem(16px);
  font-weight: 700;

  @media #{$tablet} {
    font-size: rem(20px)
  }

  &:hover {
    cursor: pointer;
  }
}

.active {
  opacity: 1;
}
</style>
