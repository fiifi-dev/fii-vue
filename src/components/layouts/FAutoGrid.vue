<template>
  <section :class="['grid', `cols-${cols}`, noGab ? '' : 'gap-5']">
    <slot />
  </section>
</template>

<script lang="ts">
import type { PropType } from "vue";

export default defineComponent({
  name: "FAutoGrid",

  props: {
    cols: {
      type: Number as PropType<1 | 2 | 3 | 4 | 5 | 6>,
      required: false,
      default: 2,
    },

    noGab: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props) {
    return {};
  },
});
</script>

<style scoped>
.col-1 {
  @apply grid-cols-1;
}

.col-2 {
  @apply children:(grid-cols-1 lg:grid-cols-2);
}

.col-2 {
  @apply children:(grid-cols-1 lg:grid-cols-3);
}

.col-4 {
  @apply children:(grid-cols-1 md:grid-cols-2 lg:grid-cols-4);
}

.col-5 {
  @apply children:(grid-cols-1 md:grid-cols-3 lg:grid-cols-5);
}

.col-6 {
  @apply children:(grid-cols-1 md:grid-cols-3 lg:grid-cols-6);
}
</style>
