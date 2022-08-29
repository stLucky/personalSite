<template>
  <div
    :class="$style.inner"
    @mousemove="handleMouseMove"
  >
    <div :class="$style.titleWrap">
      <div :class="$style.personWrap">
        <div
          ref="personEl"
          :class="$style.person"
        />
        <div
          v-for="(_, i) in Array(3)"
          :key="i"
          ref="decorEl"
          :class="$style.decor"
        />
      </div>
      <i18n-t
        ref="titleEl"
        keypath="index.subtitle"
        tag="p"
        :class="$style.title"
        class="title title--xl"
      >
        <br>
        <br>
      </i18n-t>
    </div>
    <p
      :class="$style.desc"
      class="desc"
    >
      {{ $t('index.desc') }}
    </p>
    <NavigateButtons :class="$style.btns" />
  </div>
</template>
<script setup lang="ts">
import { gsap } from "@/services/animation";

const $style = useCssModule();
const tl = gsap.timeline();

const handleMouseMove = (evt: MouseEvent) => {
  if (tl.isActive()) { return; }
  gsap.mouseMove(`.${$style.decor}`, evt, { each: 0.2 });
  gsap.mouseMove(`.${$style.person}`, evt);
};

const animatePage = () => {
  const getTextCl = () => [`.${$style.title}`, `.${$style.desc}`, `.${$style.btns}`];

  gsap.prepareDecor(tl, `.${$style.decor}`);
  gsap.prepareText(tl, getTextCl());

  gsap.animatePerson(tl, `.${$style.person}`);
  gsap.animateText(tl, getTextCl(), ">-1");
  gsap.animateDecor(tl, `.${$style.decor}`);
};

onMounted(() => {
  animatePage();
});
</script>
<style lang="scss" module>
@use '~/assets/sass/mixins' as *;
@use '~/assets/sass/global/variables' as *;

.inner {
  @include flex(center, center, column);
  height: 100%;
  padding-top: rem(48px);
  margin: 0 auto;
}

.titleWrap {
  margin: 0 0 rem($indent);

  @media #{$tablet} {
    margin: 0 0 rem($indent-l);
    @include flex;

    br:last-child {
      display: none;
    }
  }
}

.title {
  text-align: center;
  margin: 0;
}

.desc {
  text-align: center;
  margin: 0 0 rem(36px);
  max-width: rem($max-width-inner);
}

.personWrap {
  position: relative;
  margin: 0 auto rem(20px);

  @media #{$tablet} {
    flex-shrink: 0;
  }
}

.person {
  @include size(rem(241px), rem(249px));
  @include bg-image('@/assets/img/person-home.png');

  @media (min-resolution: 2dppx) {
    background-image: url('@/assets/img/person-home@2x.png');
  }
}

.decor {
  position: absolute;

  &:nth-child(2) {
    top: rem(20px);
    right: rem(-20px);
    @include size(rem(30px), rem(30px));
    @include bg-image('@/assets/img/decor-home-1.png');

    @media (min-resolution: 2dppx) {
      background-image: url('@/assets/img/decor-home-1@2x.png');
    }
  }

  &:nth-child(3) {
    top: rem(-60px);
    right: rem(10px);
    @include size(rem(45px), rem(38px));
    @include bg-image('@/assets/img/decor-home-2.png');

    @media (min-resolution: 2dppx) {
      background-image: url('@/assets/img/decor-home-2@2x.png');
    }
  }

  &:last-child {
    top: rem(-20px);
    left: rem(-10px);
    @include size(rem(32px), rem(30px));
    @include bg-image('@/assets/img/decor-home-3.png');

    @media (min-resolution: 2dppx) {
      background-image: url('@/assets/img/decor-home-3@2x.png');
    }
  }
}

.btns{
  position: relative;
}
</style>
