<template>
  <section :class="$style.inner">
    <p
      class="title title--l"
      :class="$style.title"
    >
      {{ $t('portfolios.subtitle') }}
    </p>
    <UITabs
      v-model:active="activeTab"
      :tabs="tabs"
      :class="$style.tabs"
    />
    <h2 class="visually-hidden">
      {{ activeTab }}
    </h2>
    <div :class="$style.wrap">
      <ul :class="$style.cards">
        <li
          v-for="project in activeProjects"
          :key="project.id"
          :class="$style.card"
        >
          <picture>
            <source
              type="image/webp"
              :srcset="`/assets/img/${project.src}.webp 1x, /assets/img/${project.src}@2x.webp 2x`"
            >
            <img
              :src="`/assets/img/${project.src}.jpg`"
              :srcset="`/assets/img/${project.src}@2x.jpg`"
              :alt="project.name"
              :class="$style.img"
            >
          </picture>

          <div :class="$style.textContent">
            <h3 :class="$style.subtitle">
              {{ project.name }}
            </h3>
            <p :class="$style.desc">
              {{ $t(`portfolios.${project.id}`) }}
            </p>
            <div :class="$style.links">
              <UiLinkNewTab
                :href="project.href.live"
                :class="$style.link"
              >
                {{ $t('live') }}
              </UiLinkNewTab>
              <UiLinkNewTab
                :href="project.href.code"
                :class="$style.link"
              >
                {{ $t('source_code') }}
              </UiLinkNewTab>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup lang="ts">
import { gsap } from "@/services/animation";
import { Technologies } from "@/const";
import type { TTechnologies } from "@/const";
import { projects } from "@/helpers";

// логика табов
const tabs = Object.values(Technologies);
const activeTab = ref<TTechnologies>(Technologies.ALL);
const activeProjects = computed(() =>
  activeTab.value === Technologies.ALL
    ? projects
    : projects.filter(item => item.technology === activeTab.value)
);

// анимация
const $style = useCssModule();

const animate = (targets: string | string[]) => {
  gsap.prepareText(gsap.engine, targets);
  gsap.animateText(gsap.engine, targets);
};

const animatePage = () => {
  animate([`.${$style.title}`, `.${$style.tabs}`, `.${$style.card}`]);
};

const animateCards = () => {
  animate(`.${$style.card}`);
};

watch(activeTab, () => {
  nextTick(() => {
    gsap.engine.killTweensOf(`.${$style.card}`);
    animateCards();
  });
});

onMounted(() => {
  animatePage();
});
</script>
<style lang="scss" module>
@use '~/assets/sass/mixins' as *;
@use '~/assets/sass/global/variables' as *;

.inner {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.title {
  text-align: center;
  margin: 0 0 rem($indent);

  @media #{$tablet} {
    margin: 0 0 rem($indent-l);
  }
}

.tabs {
  margin: 0 0 rem($indent);

  @media #{$tablet} {
    margin: 0 0 rem($indent-l);
  }
}

.wrap {
  max-width: rem(1000px);
  width: 100%;
  margin: 0 auto;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: rem(20px);

  @media #{$tablet} {
    gap: rem(30px);
  }
}

.card {
  @include flex(flex-start, flex-start, column);
  background-color: var(--background-tertiary);
  border: rem(1px) solid var(--background-tertiary-004);
  border-radius: rem(20px);
  overflow: hidden;

  box-shadow: var(--background-tertiary-04) 0px 2px 4px,
    var(--background-tertiary-03) 0px 7px 13px -3px,
    var(--background-tertiary-02) 0px -3px 0px inset;
}

.textContent {
  @include flex(flex-start, flex-start, column);
  flex-grow: 1;
  padding: rem(20px);
}

.subtitle {
  font-size: rem(18px);
  margin: 0 0 rem($indent-s);
}

.desc {
  font-size: rem(14px);
  margin: 0 0 rem($indent-s);
}

.links {
  margin: auto 0 0;
}

.link {
  font-size: rem(14px);

  &:first-of-type {
    margin: 0 rem(20px) 0 0;
  }
}
</style>
