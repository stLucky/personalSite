<template>
  <div @mousemove="handleMouseMove">
    <div :class="$style.titleWrap">
      <div :class="$style.person" />
      <i18n-t
        keypath="about.subtitle"
        tag="p"
        :class="$style.title"
        class="title title--l"
      >
        <template #profession>
          <span class="text text--accent">
            {{ $t('frontend_developer') }}
          </span>
        </template>
        <template #job>
          <span class="text text--accent"> ExactFarming </span>
        </template>
      </i18n-t>
    </div>
    <section :class="$style.section">
      <h2 class="visually-hidden">
        {{ $t('about.intro.title') }}
      </h2>
      <p class="desc" :class="$style.desc">
        {{ $t('about.intro.first_item') }}
      </p>
      <p class="desc" :class="$style.desc">
        {{ $t('about.intro.second_item') }}
      </p>
      <p class="desc" :class="$style.desc">
        {{ $t('about.intro.third_item') }}
      </p>
    </section>
    <section :class="$style.section">
      <h2 :class="$style.subtitle">
        {{ $t('about.experience.title') }}
      </h2>
      <i18n-t
        keypath="about.experience.first_item"
        tag="p"
        class="desc"
        :class="$style.desc"
      >
        <a :href="teamLeadLink" target="_blank" class="link">
          TeamLead
        </a>
      </i18n-t>
      <i18n-t
        keypath="about.experience.second_item"
        tag="p"
        class="desc"
        :class="$style.desc"
      >
        <a :href="exactFarmingLink" target="_blank" class="link">
          ExactFarming
        </a>
      </i18n-t>
      <UiLinkNewTab href="https://disk.yandex.ru/i/uQ0zhWJkUUeEng">
        {{ $t('read_more') }}
        {{ $t('in_cv') }}
      </UiLinkNewTab>
    </section>
    <section :class="$style.section">
      <h2 :class="$style.subtitle">
        {{ $t('about.tech_stack.title') }}
      </h2>
      <p class="desc" :class="$style.desc">
        {{ $t('about.tech_stack.desc') }}
      </p>
      <ul>
        <li v-for="scope of scopes" :key="scope" :class="$style.scopeItem">
          <span :class="$style.scopeTitle">
            {{ $t(`about.tech_stack.${scope}.title`) }}
          </span>
          {{ $t(`about.tech_stack.${scope}.technologies`) }}
        </li>
      </ul>
    </section>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { gsap } from "@/services/animation";

const { locale } = useI18n({ useScope: "global" });
const isEnLocale = computed(() => locale.value === "en");

const teamLeadLink = computed(
  () => `https://teamlead.com${isEnLocale.value ? "" : "/indexRu.html"}`
);
const exactFarmingLink = computed(
  () => `https://exactfarming.com/${isEnLocale.value ? "en" : "ru"}`
);

const scopes = ["stylization", "js", "git", "build_systems", "testing"];

const $style = useCssModule();
const tl = gsap.timeline();

const handleMouseMove = (evt: MouseEvent) => {
  if (tl.isActive()) { return; }
  gsap.mouseMove(`.${$style.person}`, evt);
};

const animatePage = () => {
  const getTextCl = () => [`.${$style.title}`, `.${$style.section}`];

  gsap.prepareText(tl, getTextCl());
  gsap.animatePerson(tl, `.${$style.person}`);
  gsap.animateText(tl, getTextCl(), ">-2");
};

onMounted(() => {
  animatePage();
});
</script>
<style lang="scss" module>
@use '~/assets/sass/mixins' as *;
@use '~/assets/sass/global/variables' as *;

.titleWrap {
  margin-bottom: rem($indent);

  @media #{$tablet} {
    @include flex(flex-start);
    margin-bottom: rem($indent-l);
  }
}

.person {
  @include size(rem(322px), rem(239px));
  @include bg-image('@/assets/img/person-about.png');
  margin: 0 auto rem($indent);

  @media (min-resolution: 2dppx) {
    background-image: url('@/assets/img/person-about@2x.png');
  }

  @media #{$tablet} {
    flex-shrink: 0;
    margin: 0;
  }
}

.section {
  margin: 0 0 rem($indent);
}

.title {
  text-align: center;
  margin: 0 auto;

  @media #{$tablet} {
    text-align: left;
    margin: 0;
  }
}

.desc {
  margin: 0 0 rem($indent-s);

  &:last-child {
    margin: 0;
  }
}

.subtitle {
  margin: 0 0 rem($indent-s);
  font-size: $text-m;
  font-weight: 700;
  // color: var(--text-secondary);
}

.scope {
  &Item {
    margin: 0 0 rem(5px);

    &:last-child {
      margin: 0;
    }
  }

  &Title {
    font-weight: 600;
    font-size: rem(20px);
    color: var(--text-secondary);
  }
}
</style>
