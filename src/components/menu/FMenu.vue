<template>
  <div class="p-1">
    <RouterLink
      v-for="item in items"
      :key="item.key"
      :to="item.to"
      v-slot="{ isExactActive, isActive, navigate }"
      custom
    >
      <div
        :class="[
          'f-menu',
          {
            'f-menu-active': isExactActive || isActive,
            'justify-center': collapse,
          },
        ]"
        @click="navigate"
      >
        <Component :is="item.icon" class="w-5 h-5" />
        <span v-if="!collapse">{{ item.label }}</span>
      </div>
    </RouterLink>
  </div>
</template>

<script lang="ts">
import { MenuItem } from "../../types/general";
import type { PropType } from "vue";

export default defineComponent({
  name: "FMenu",

  props: {
    items: {
      type: Array as PropType<MenuItem[]>,
      required: false,
      default: () => [],
    },

    collapse: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  setup() {
    return {};
  },
});
</script>

<style scoped>
.f-menu {
  @apply p-2 mb-2 rounded-sm text-sm uppercase tracking-widest;
  @apply whitespace-nowrap overflow-hidden text-gray-400;
  @apply hover:(bg-primary-100 cursor-pointer bg-opacity-40);
  @apply flex flex-nowrap items-center  gap-3 transition-all;
}

.f-menu-active {
  @apply bg-primary-100  bg-opacity-40;
}
</style>
