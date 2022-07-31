<template>
  <div :class="['grid', `cols-${cols}`]">
    <slot />
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";

export default defineComponent({
  name: "FAutoCols",

  props: {
    cols: {
      type: Number as PropType<2 | 3 | 4 | 5 | 6>,
      required: false,
      default: 2,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.cols-2 {
  @apply grid-cols-1 lg:grid-cols-2;
}

.cols-3 {
  @apply grid-cols-1 lg:grid-cols-3;
}

.cols-4 {
  @apply grid-cols-1 md:grid-cols-2 lg:grid-cols-4;
}

.cols-5 {
  @apply grid-cols-1 md:grid-cols-2 lg:grid-cols-5;
}

.cols-6 {
  @apply grid-cols-1 sm:grid-cols-2 lg:grid-cols-6;
  @apply md:grid-cols-3 lg:grid-cols-6;
}
</style>
