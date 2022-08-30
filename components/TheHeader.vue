<template>
  <header :class="$style.header">
    <div class="container">
      <div :class="$style.titleWrap">
        <UiBtnBurger
          :active="isVisibleSidebar"
          :class="$style.burgerBtn"
          @click="handleBtnClcik"
        />
        <h1 :class="$style.title">
          {{ $t(`${routeName?.toString()}.title`) }}
        </h1>
      </div>
      <UiSidebar :active="isVisibleSidebar">
        <nav :class="$style.nav">
          <ul :class="$style.menu">
            <li
              v-for="name in Routes.Names"
              :key="name"
              :class="$style.item"
            >
              <NuxtLink
                :to="Routes.Paths[name]"
                :class="$style.link"
                :active-class="$style.linkActive"
              >
                {{ $t(`${name}.title`) }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
        <BaseSwitches />
      </UiSidebar>
    </div>
  </header>
</template>
<script setup lang="ts">
import { Routes } from "@/helpers";

// sidebar
const isVisibleSidebar = ref(false);
const handleBtnClcik = () => {
  isVisibleSidebar.value = !isVisibleSidebar.value;
};
const closeSidebar = () => {
  isVisibleSidebar.value = false;
};

// routes
const route = useRoute();
const routeName = computed(() => route.name);
watch(routeName, () => {
  if (isVisibleSidebar.value) {
    closeSidebar();
  }
});
</script>
<style lang="scss" module>
@use '~/assets/sass/mixins' as *;
@use '~/assets/sass/global/variables' as *;

$offset-link-decor: rem(8px);

.header {
  padding: 20px 0;
  background-image: linear-gradient(158deg,
      var(--background-secondary) -100%,
      var(--background-primary-004) 100%);
  min-height: $header-height;
}

.titleWrap {
  @include flex(flex-start);
  flex-grow: 1;

  @media #{$tablet} {
    display: none;
  }
}

.title {
  font-size: rem(14px);
  margin: 0 auto;
}

.nav {
  @media #{$tablet} {
    flex-grow: 1;
  }
}

.menu {
  font-size: rem(24px);
  margin: 0 0 rem(50px);

  @media #{$tablet} {
    font-size: clamp(1rem, 1vw + 0.5rem, 1.125rem);
    @include flex(space-between);
    max-width: rem(500px);
    margin: 0 auto;

    @media #{$resized-switch} {
      max-width: rem($max-width-inner);
    }
  }
}

.burgerBtn {
  position: relative;
  z-index: $z-extra-high;
}

.item {
  padding-left: $offset-link-decor;
  text-align: center;
  margin-bottom: rem(30px);

  &:last-child {
    margin-bottom: 0;
  }

  @media #{$tablet} {
    text-align: initial;
    margin: initial;
  }
}

.link {
  position: relative;
  color: var(--text-primary);
  font-weight: 600;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -#{$offset-link-decor};
    transform: translate(-50%, -50%) scale(0);
    @include size(rem(5px), rem(5px));
    background-color: var(--text-secondary);
    border-radius: 50%;
    margin-right: rem(4px);
    @include transition;
    opacity: 0;
  }

  &:hover {
    &::before {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  &Active {
    &::before {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
}
</style>
