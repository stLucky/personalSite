<template>
  <footer :class="$style.footer" @mousemove="handleMouseMove">
    <div class="container" :class="$style.inner">
      <ul :class="[$style.list, $style.footerItem, $style.footerItemSocial]">
        <li :class="$style.item">
          <a :href="Contacts.Links.GITHUB" :class="$style.link">
            <IconGithub :class="$style.icon" />
          </a>
        </li>
        <li :class="$style.item">
          <a :href="Contacts.Links.TWITTER" :class="$style.link">
            <IconTwitter :class="$style.icon" />
          </a>
        </li>
        <li :class="$style.item">
          <a :href="Contacts.Links.TELEGRAM" :class="$style.link">
            <IconTelegram :class="$style.icon" />
          </a>
        </li>
      </ul>
      <p :class="[$style.footerItem, $style.footerItemCode]">
        {{ $t('code_available') }}
      </p>
      <i18n-t
        keypath="copyright"
        tag="p"
        :class="[$style.footerItem, $style.footerItemCopyright]"
      >
        <br>
      </i18n-t>
      <div v-if="isHomeRoute" :class="$style.hand" />
    </div>
  </footer>
</template>
<script setup lang="ts">
import { Routes, Contacts } from "@/helpers";
import { Breakpoints } from "@/const";

import { gsap } from "@/services/animation";

const $style = useCssModule();

const route = useRoute();
const isLargeTablet = useMediaQuery(`(min-width: ${Breakpoints.TABLET}px)`);
const isHomeRoute = computed(() => route.name === Routes.Names.HOME);

const tl = gsap.engine.exportRoot();

const handleMouseMove = (evt: MouseEvent) => {
  if (tl.isActive() || !isHomeRoute.value) {
    return;
  }

  gsap.mouseMove(`.${$style.hand}`, evt);
};

const animatePage = () => {
  if (!isLargeTablet.value) { return; }

  gsap.makeVisible(`.${$style.hand}`);

  gsap.engine.set(`.${$style.hand}`, {
    y: "100%"
  });

  tl.to(
    `.${$style.hand}`,
    {
      y: 0,
      duration: 1
    },
    ">-2"
  );
};

watch(isHomeRoute, () => {
  if (!isHomeRoute.value) {
    return;
  }

  nextTick(() => {
    animatePage();
  });
});

onMounted(() => {
  if (isHomeRoute.value) {
    animatePage();
  }
});
</script>
<style lang="scss" module>
@use '~/assets/sass/mixins' as *;
@use '~/assets/sass/global/variables' as *;

.footer {
  position: relative;
  padding: rem(30px) 0;
  text-align: center;

  @media #{$tablet} {
    text-align: left;
    padding: rem(50px) 0 rem(30px);
  }
}

.inner {
  @media #{$tablet} {
    @include flex(space-between);
  }
}

.footerItem {
  position: relative;
  z-index: $z-low;
  margin: 0 0 rem(10px);
  font-size: rem(14px);

  &:last-child {
    margin: 0;
  }

  &Copyright {
    br {
      display: none;
    }
  }

  @media #{$tablet} {
    margin: 0;

    &Social {
      order: 2;
    }

    &Code {
      order: 3;
    }

    &Copyright {
      order: 1;

      br {
        display: block;
      }
    }
  }
}

.list {
  @include flex;
}

.item {
  margin-right: rem(20px);

  &:last-child {
    margin-right: 0;
  }
}

.link {
  display: block;
  color: var(--text-primary);
  @include transition;

  &:hover {
    color: var(--text-secondary);
  }
}

.icon {
  @include size(rem(24px), rem(24px));
  vertical-align: middle;
}

.hand {
  display: none;

  @media #{$tablet} {
    display: block;
    position: absolute;
    @include size(rem(117px), rem(362px));
    @include bg-image('@/assets/img/hand.png');
    bottom: 0;
    left: calc(50% + rem(280px));
    visibility: hidden;

    @media (min-resolution: 2dppx) {
      background-image: url('@/assets/img/hand@2x.png');
    }
  }
}
</style>
