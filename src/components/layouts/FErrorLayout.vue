<template>
  <div class="h-screen w-full p-10 bg-gradient-to-r from-gray-50 to-light-100">
    <slot>
      <div class="m-auto flex flex-col gap-5">
        <h2 class="text-10xl font-bold">
          {{ status }}
        </h2>

        <h1 class="text-xl text-gray-400">{{ messages[status] }}</h1>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";

export default defineComponent({
  name: "FErrorLayout",

  props: {
    status: {
      type: Number as PropType<404 | 500>,
      required: false,
      default: 404,
    },
  },

  setup(props) {
    const messages = computed(() => ({
      404: "Page Not Found: Whoops, nothing to see here",
      500: "Internal Server Error: Something went wrong",
    }));
    return { messages };
  },
});
</script>

<style scoped></style>
