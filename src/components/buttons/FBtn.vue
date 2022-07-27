<template>
  <button
    :disabled="disabled"
    :class="[
      'btn',
      `btn-${variant}`,
      dark ? 'text-black' : 'text-white',
      block ? 'w-full' : '',
      ...makeTextSize(size),
      ...makePaddingY(size),
    ]"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { Size, Variant } from "@/types";
import type { PropType } from "vue";

export default defineComponent({
  name: "FBtn",

  props: {
    ...getObjSubset(makeGeneralInputProps(), ["block", "disabled"]),

    size: {
      type: String as PropType<Size>,
      required: false,
      default: "md",
    },

    variant: {
      type: String as PropType<Variant>,
      required: false,
      default: "primary",
    },

    dark: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  setup() {
    return {
      makeTextSize,
      makePaddingY,
    };
  },
});
</script>

<style scoped>
.btn {
  @apply uppercase tracking-wider pl-5 pr-5;
  @apply disabled:(opacity-70 cursor-default);
}

.btn-primary {
  @apply bg-primary-200 hover:not-disabled:bg-primary-300;
  @apply active:not-disabled:bg-primary-100;
}

.btn-danger {
  @apply bg-danger-200 hover:not-disabled:bg-danger-300;
  @apply active:not-disabled:bg-danger-100;
}
.btn-secondary {
  @apply bg-secondary-200 hover:not-disabled:bg-secondary-300;
  @apply active:not-disabled:bg-secondary-100;
}
.btn-warning {
  @apply bg-warning-200 hover:not-disabled:bg-warning-300;
  @apply active:not-disabled:bg-warning-100;
}
.btn-success {
  @apply bg-success-200 hover:not-disabled:bg-success-300;
  @apply active:not-disabled:bg-success-100;
}
.btn-info {
  @apply bg-info-200 hover:not-disabled:bg-info-300;
  @apply active:not-disabled:bg-info-100;
}
.btn-light {
  @apply bg-light-200 hover:not-disabled:bg-light-300;
  @apply active:not-disabled:bg-light-100;
}
.btn-dark {
  @apply bg-dark-200 hover:not-disabled:bg-dark-300;
  @apply active:not-disabled:bg-dark-100;
}
</style>
