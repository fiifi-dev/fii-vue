<template>
  <div :class="[noBody ? '' : 'p-5', 'border']">
    <slot />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: "FCard",

  props: {
    noBody: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
