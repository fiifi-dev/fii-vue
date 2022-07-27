<template>
  <div
    :style="styles"
    :class="['flex', vertical ? 'flex-col' : '', noWrap ? 'flex-nowrap' : '']"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import type { StyleValue } from "vue";

export default defineComponent({
  name: "FSpace",

  props: {
    size: {
      type: String,
      required: false,
      default: "1rem",
      validator: (value: string) => {
        const test = new RegExp("^\\d+(px|em|rem)$").test(value);
        if (!test)
          console.error("Must provide a valid size: 10rem | 10px | 10em");
        return test;
      },
    },

    vertical: {
      type: Boolean,
      default: false,
      required: false,
    },

    noWrap: {
      type: Boolean,
      default: false,
      required: false,
    },
  },

  setup(props) {
    const styles = computed<StyleValue>(() => ({
      gridGap: props.size,
      gap: props.size,
    }));

    return { styles };
  },
});
</script>

<style scoped></style>
