<template>
  <div class="w-full h-full flex items-center justify-center">
    <div :style="styles">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { StyleValue } from "vue";

export default defineComponent({
  name: "FAdminPage",

  props: {
    width: {
      type: String,
      required: false,
      default: "10rem",
      validator: (value: string) => {
        const test = new RegExp("^\\d+(px|em|rem)$").test(value);
        if (!test)
          console.error("Must provide a valid size: 10rem | 10px | 10em");
        return test;
      },
    },
  },
  setup(props) {
    const styles = computed<StyleValue>(() => ({
      width: props.width,
    }));

    return { styles };
  },
});
</script>

<style scoped></style>
