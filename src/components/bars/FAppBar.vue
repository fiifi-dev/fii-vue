<template>
  <nav class="f-nav" ref="nav">
    <div>
      <slot name="logo" :has-height="hasHeight">Logo</slot>
    </div>

    <ul class="nav-container" v-if="isLargeScreen">
      <RouterLink
        v-for="item in items"
        :key="item.label"
        :to="item.to"
        v-slot="{ isExactActive, isActive, navigate }"
        custom
      >
        <li
          :class="[
            'cursor-pointer',
            hoverClass,
            classes,
            isExactActive || isActive ? activeClass : '',
          ]"
          @click="navigate"
        >
          <span>{{ item.label }}</span>
        </li>
      </RouterLink>
    </ul>

    <button
      :class="[classes, hoverClass]"
      v-if="!isLargeScreen"
      @click="showDrawer = !showDrawer"
    >
      <IFiiMenu class="h-6 w-6" />
    </button>

    <FDrawer v-model="showDrawer">
      <template #header>
        <slot name="header" />
      </template>

      <template #default>
        <ul>
          <RouterLink
            v-for="item in items"
            :key="item.label"
            :to="item.to"
            v-slot="{ isExactActive, isActive, navigate }"
            custom
          >
            <li
              class="f-sidebar"
              :class="[{ '!text-gray-600': isExactActive || isActive }]"
              @click="navigate"
            >
              <span>{{ item.label }}</span>
            </li>
          </RouterLink>
        </ul>
      </template>
    </FDrawer>
  </nav>
</template>

<script lang="ts">
import { AppBarItem } from "../../types/general";
import { PropType } from "vue";

export default defineComponent({
  name: "FAppBar",

  props: {
    items: {
      type: Array as PropType<AppBarItem[]>,
      required: false,
      default: () => [],
    },
  },
  setup() {
    const { y } = useWindowScroll();
    const isLargeScreen = useMediaQuery("(min-width: 900px)");
    const height = ref<"0px" | "60px">("0px");
    const showDrawer = ref(false);
    const hasHeight = computed(() => height.value === "60px");

    watch(y, (val) => {
      if (val > 20) height.value = "60px";
      else height.value = "0px";
    });

    watch(isLargeScreen, (val) => {
      if (val && showDrawer.value) {
        showDrawer.value = false;
      }
    });

    const activeClass = computed(() => {
      if (hasHeight.value) return "!text-gray-700";
      return "!text-gray-50";
    });

    const classes = computed(() => {
      if (hasHeight.value) return "text-gray-400";
      return "text-gray-200";
    });

    const hoverClass = computed(() => {
      if (hasHeight.value) return "hover:text-gray-600";
      return "hover:text-gray-300";
    });
    return {
      height,
      classes,
      hasHeight,
      activeClass,
      hoverClass,
      showDrawer,
      isLargeScreen,
    };
  },
});
</script>

<style scoped>
.f-nav {
  --nav-height: v-bind(height);
  --nav-color: theme("colors.gray.500");
  --nav-color-light: theme("colors.gray.50");

  @apply fixed top-0 inset-x-0 bg-transparent h-15 z-10;
  @apply flex items-center justify-between px-10 transition-all;
  @apply after:(content-[''] absolute inset-0 bg-white -z-1);
}
.f-nav::after {
  height: var(--nav-height);
  transition: height 200ms ease-in-out;
}

.nav-container {
  @apply uppercase tracking-widest;
  @apply font-medium text-sm flex items-center gap-4;
}

.f-sidebar {
  @apply cursor-pointer uppercase tracking-wide;
  @apply text-lg text-center py-1;
  @apply text-gray-400 hover:text-gray-500;
}
</style>
