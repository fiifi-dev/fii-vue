<template>
  <div class="fixed top-0 bottom-0 left-0 right-0 bg-gray-100">
    <div class="flex flex-nowrap h-full w-full">
      <aside :style="sidebarWidth" class="bg-primary-200">
        <div :style="sidebarHeaderStyle" class="bg-primary-300">
          <slot name="sidebar-header" :collapse="collapse">
            Sidebar header
          </slot>
        </div>

        <div
          :style="sidebarContentStyle"
          class="overflow-y-auto overflow-x-hidden py-5"
        >
          <slot name="sidebar-main" :collapse="collapse">
            <FMenu :items="navItems" :collapse="collapse" />
          </slot>
        </div>

        <div
          :style="sidebarFooterStyle"
          class="bg-primary-300 flex items-center justify-center text-gray-300"
        >
          <slot name="sidebar-footer" :collapse="collapse">
            <button @click="$emit('logout')">
              <IFiiPower class="w-5 h-5" />
            </button>
          </slot>
        </div>
      </aside>

      <div class="w-full h-full">
        <nav class="border bg-white" :style="appbarStyle">
          <div class="f-space justify-between">
            <slot name="toggle" :collapse="collapse" :toggle="toggleMobile">
              <button @click="toggleMobile" class="text-gray-600">
                <IFiiMenu class="w-6 h-6" />
              </button>
            </slot>

            <div class="flex items-center flex nowrap gap-3 text-gray-600">
              <slot name="appbar" :collapse="collapse">
                <button @click="$emit('logout')">
                  <IFiiPower class="w-5 h-5" />
                </button>

                <button @click="$emit('user')">
                  <IFiiPerson class="w-5 h-5" />
                </button>
              </slot>
            </div>
          </div>
        </nav>

        <main :style="contentStyle">
          <slot :collapse="collapse" />
        </main>

        <footer :style="footerStyle" class="bg-white border">
          <div class="f-space justify-between">
            <slot name="footer" :collapse="collapse">Footer</slot>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { MenuItem } from "@/types/general";
import type { PropType, StyleValue } from "vue";

export default defineComponent({
  name: "FAdminLayout",

  components: {},

  props: {
    navItems: {
      type: Array as PropType<MenuItem[]>,
      required: false,
      default: () => [],
    },

    desktopWidth: {
      type: Number,
      required: false,
      default: 200,
    },

    mobileWidth: {
      type: Number,
      required: false,
      default: 70,
    },

    appbarHeight: {
      type: Number,
      required: false,
      default: 60,
    },

    footerHeight: {
      type: Number,
      required: false,
      default: 32,
    },

    sidebarHeaderHeight: {
      type: Number,
      required: false,
      default: 60,
    },

    sidebarFooterHeight: {
      type: Number,
      required: false,
      default: 32,
    },

    appbarClass: {
      type: String,
      default: "",
      required: false,
    },
  },
  emits: {
    "update:mobile": (_value: boolean) => true,
    logout: null,
    user: null,
  },

  setup(props) {
    const collapse = useStorage("m", false);
    const isLargeScreen = useMediaQuery("(min-width: 1000px)");

    watch(isLargeScreen, (val) => {
      if (val) collapse.value = false;
      else collapse.value = true;
    });

    const sidebarWidth = computed<StyleValue>(() => {
      const width = collapse.value ? props.mobileWidth : props.desktopWidth;

      return {
        width: `${width}px`,
      };
    });

    const contentStyle = computed<StyleValue>(() => {
      const height = props.appbarHeight + props.footerHeight;
      return { height: `calc(100% - ${height}px)` };
    });

    const appbarStyle = computed<StyleValue>(() => ({
      height: ` ${props.appbarHeight}px`,
    }));

    const footerStyle = computed<StyleValue>(() => ({
      height: ` ${props.footerHeight}px`,
    }));

    const sidebarContentStyle = computed<StyleValue>(() => {
      const height = props.sidebarHeaderHeight + props.sidebarFooterHeight;
      return { height: `calc(100% - ${height}px)` };
    });

    const sidebarHeaderStyle = computed<StyleValue>(() => ({
      height: ` ${props.sidebarHeaderHeight}px`,
    }));

    const sidebarFooterStyle = computed<StyleValue>(() => ({
      height: ` ${props.sidebarFooterHeight}px`,
    }));

    const toggleMobile = () => {
      collapse.value = !collapse.value;
    };

    return {
      collapse,
      sidebarWidth,
      contentStyle,
      appbarStyle,
      footerStyle,
      sidebarContentStyle,
      sidebarHeaderStyle,
      sidebarFooterStyle,
      toggleMobile,
    };
  },
});
</script>

<style scoped>
aside {
  @apply h-full flex-grow-0 flex-shrink-0 transition-all;
}

nav {
  @apply flex-grow-0 flex-shrink-0;
}

main {
  @apply flex-grow-0 flex-shrink-0 overflow-y-auto;
}

footer {
  @apply flex-grow-0 flex-shrink-0;
}

.f-space {
  @apply flex items-center h-full px-4;
}
</style>
