<template>
  <img
    v-bind="$attrs"
    :loading="loading"
    :decoding="decoding"
    :fetchpriority="fetchpriority"
  />
</template>

<script lang="ts">
import type { PropType } from "vue";

export default defineComponent({
  name: "FImg",
  props: {
    loading: {
      type: String as PropType<"lazy" | "eager">,
      required: false,
      default: "lazy",
    },
    decoding: {
      type: String as PropType<"async" | "auto" | "sync">,
      required: false,
      default: "async",
    },
    fetchpriority: {
      type: String as PropType<"low" | "high" | "auto">,
      required: false,
      default: "low",
    },
  },
});
</script>

<style scoped></style>
