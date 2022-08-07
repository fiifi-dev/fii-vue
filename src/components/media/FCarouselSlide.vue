<template>
  <div class="slide-wrapper">
    <h1 class="slide-title">
      {{ title }}
    </h1>

    <p class="slide-description" v-if="description">
      {{ description }}
    </p>

    <div class="flex items-center flex-wrap gap-5" v-if="actions.length > 0">
      <FBtn
        v-for="action in actions"
        :key="action.key"
        size="lg"
        :variant="action.variant"
        @click="$emit('action', action.key)"
      >
        {{ action.label }}
      </FBtn>
    </div>
  </div>
</template>

<script lang="ts">
import { SlideItem, Variant } from "../../types/general";
import { PropType } from "vue";



export default defineComponent({
  name: "FCarouselSlide",

  props: {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: false,
      default: "",
    },

    actions: {
      type: Array as PropType<SlideItem[]>,
      required: false,
      default: () => [
        { key: "about_Us", label: "About Us", variant: "primary" },
      ],
    },
  },

  emits: {
    action: (_value: string) => true,
  },

  setup() {
    return {};
  },
});
</script>

<style scoped>
.slide-wrapper {
  @apply h-full w-full flex flex-col justify-center gap-5 p-10;
}

.slide-title {
  @apply font-bold text-gray-100 max-w-4xl;
  font-size: clamp(1.5rem, 4vw + 1rem, 3.5rem);
}

.slide-description {
  @apply max-w-3xl text-gray-600 relative p-5 tracking-wider;
  @apply after:(content-[''] block absolute inset-0 bg-white -z-1);
}
</style>
