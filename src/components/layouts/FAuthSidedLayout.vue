<template>
  <div class="absolute top-0 bottom-0 left-0 right-0">
    <div class="w-full h-full grid grid-cols-2">
      <div
        :class="[
          'w-full h-full hidden lg:block',
          sideRight ? 'order-last' : '',
        ]"
      >
        <slot name="sided" />
      </div>

      <div :style="bgStyle" :class="['f-container', bgClass]">
        <div :class="contentClass">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: "FAuthSidedLayout",

  props: {
    ...makeLayoutProps(),
    sideRight: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  setup(props) {
    const { contentClass } = useLayout(() => props);
    return { contentClass };
  },
});
</script>

<style scoped>
.f-container {
  @apply h-full w-full flex flex-nowrap;
  @apply items-center justify-center <lg:col-span-2;
}
</style>
