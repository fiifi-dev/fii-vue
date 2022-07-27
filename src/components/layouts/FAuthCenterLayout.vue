<template>
  <div class="absolute top-0 bottom-0 left-0 right-0">
    <div :style="bgStyle" :class="['f-container', bgClass]">
      <div :class="[...contentClass, 'overflow-x-hidden']">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: "FAuthCenterLayout",

  props: {
    ...makeLayoutProps(),
  },

  setup(props) {
    const { contentClass } = useLayout(() => props);
    return { contentClass };
  },
});
</script>

<style scoped>
.f-container {
  @apply h-full w-full flex items-center justify-center;
}
</style>
