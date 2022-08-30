<template>
  <div
    :class="$style.inner"
    @mousemove="handleMouseMove"
  >
    <div :class="$style.personWrap">
      <div :class="$style.person" />
      <div :class="$style.smile" />
    </div>

    <div :class="$style.textContent">
      <p
        :class="$style.title"
        class="title title--l"
      >
        {{ $t('contacts.subtitle') }}
      </p>
      <ul
        class="desc"
        :class="$style.list"
      >
        <li
          v-for="(link, name) in Contacts.Links"
          :key="name"
          :class="$style.contactItem"
        >
          <span :class="$style.contactName"> {{ name }}: </span>
          <a
            :href="link"
            class="link"
            target="_blank"
          >
            {{ linkName(name) }}
          </a>
        </li>
      </ul>
      <NavigateButtons :class="$style.btns" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { gsap } from "@/services/animation";
import { Contacts } from "@/helpers";
import { Breakpoints } from "@/const";

const linkName = computed(
  () => (name: keyof typeof Contacts.Links) => Contacts.getName(name)
);

// media-query
const isLargeTablet = useMediaQuery(`(min-width: ${Breakpoints.TABLET}px)`);

// animation
const $style = useCssModule();
const tl = gsap.timeline();

const handleMouseMove = (evt: MouseEvent) => {
  if (tl.isActive()) { return; }
  gsap.mouseMove([`.${$style.smile}`, `.${$style.person}`], evt, { each: 0.2 });
};

const animatePage = () => {
  const getTextCl = () => [`.${$style.title}`, `.${$style.contactItem}`, `.${$style.btns}`];

  gsap.makeVisible(`.${$style.inner}`);

  gsap.prepareDecor(tl, `.${$style.smile}`);
  gsap.prepareText(tl, getTextCl());

  if (isLargeTablet.value) {
    gsap.animatePerson(tl, `.${$style.person}`, "y");
  }

  const textPosition = isLargeTablet.value ? ">-1" : undefined;

  gsap.animateText(tl, getTextCl(), textPosition);
  gsap.animateDecor(tl, `.${$style.smile}`, ">-1");
};

onMounted(() => {
  animatePage();
});
</script>
<style lang="scss" module>
@use '~/assets/sass/mixins' as *;
@use '~/assets/sass/global/variables' as *;

.inner {
  visibility: hidden;

  @media #{$tablet} {
    @include flex(flex-start);
  }
}

.personWrap {
  @media #{$tablet} {
    position: relative;
    margin-right: rem($indent);
    flex-shrink: 0;
  }
}

.person {
  @media #{$tablet} {
    @include size(rem(183px), rem(342px));
    @include bg-image('@/assets/img/person-contacts.png');

    @media (min-resolution: 2dppx) {
      background-image: url('@/assets/img/person-contacts@2x.png');
    }
  }
}

.smile {
  @media #{$tablet} {
    position: absolute;
    top: rem(-10px);
    left: rem(20px);
    @include size(rem(46px), rem(52px));
    @include bg-image('@/assets/img/smile.png');

    @media (min-resolution: 2dppx) {
      background-image: url('@/assets/img/smile@2x.png');
    }
  }
}

.textContent {
  max-width: $max-width-inner;
}

.title {
  margin: 0 0 rem($indent);

  @media #{$tablet} {
    margin: 0 0 rem($indent-l);
  }
}

.desc {
  margin: 0 0 rem($indent);
}

.list {
  margin: 0 0 rem($indent);

  @media #{$tablet} {
    margin: 0 0 rem($indent-l);
  }
}

.contact {
  &Item {
    margin-bottom: rem($indent-s);

    &::first-letter {
      text-transform: uppercase;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &Name {
    font-weight: 600;
    text-transform: lowercase;
  }
}

.btns {
  position: relative;
}
</style>
