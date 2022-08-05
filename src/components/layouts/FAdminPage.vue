<template>
  <div class="w-full h-full flex justify-center p-5">
    <div :style="styles" class="m-auto">
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
      default: "20rem",
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
      flexBasis: props.width,
    }));

    return { styles };
  },
});
</script>

<style scoped></style>
