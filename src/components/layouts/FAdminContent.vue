<template>
  <div class="w-full h-full">
    <div class="h-7 f-tabs" v-if="tabs.length > 0">
      <RouterLink
        v-for="(tab, index) in tabs"
        :key="tab.key"
        :to="tab.to"
        v-slot="{ isExactActive, navigate }"
        custom
      >
        <slot :name="`tab(${tab.key})`" :tab="tab" :index="index">
          <div
            class="f-tab-item"
            :class="{ 'border-primary-100 border-b': isExactActive }"
            @click="navigate"
          >
            {{ tab.label }}
          </div>
        </slot>
      </RouterLink>
    </div>

    <div
      :class="[
        tabs.length > 0 ? 'h-[calc(100%_-_1.75rem)]' : 'h-full',
        'overflow-y-auto p-5',
      ]"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Tab } from "@/types/general";
import type { PropType } from "vue";

export default defineComponent({
  name: "FAdminContent",

  props: {
    tabs: {
      type: Array as PropType<Tab[]>,
      required: false,
      default: () => [],
    },
  },

  setup() {
    return {};
  },
});
</script>

<style scoped>
.f-tabs {
  @apply bg-white border flex items-center flex-nowrap;
  @apply overflow-y-hidden overflow-x-auto px-5;
}

.f-tab-item {
  @apply px-6 text-xs tracking-wider h-full flex items-center;
  @apply uppercase hover:cursor-pointer text-gray-600;
}
</style>
