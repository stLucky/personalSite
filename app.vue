<template>
  <div :class="$style.app">
    <NuxtLayout :key="$route.path">
      <NuxtPage :key="$route.path" />
    </NuxtLayout>
  </div>
</template>
<style lang="scss" module>
.app {
  min-height: 100vh;
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  background-color: var(--background-primary);
  color: var(--text-primary);
  overflow: hidden;
}
</style>
