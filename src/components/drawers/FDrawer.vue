<template>
  <Teleport to="body">
    <Transition :name="transitionName" :duration="1000">
      <div class="sidebar-container" v-if="visible" key="overlay">
        <div class="sidebar-content" :class="contentClass">
          <div
            class="flex flex-col bg-white h-full shadow"
            ref="target"
            key="content"
          >
            <div class="basis-5 grow-0 shrink-0 flex p-5" :class="actionClass">
              <button @click="visible = false">
                <slot name="action">
                  <IFiiClose class="w-5 h-5" />
                </slot>
              </button>
            </div>

            <div>
              <slot name="header" />
            </div>

            <div class="overflow-y-auto flex-1 p-5">
              <slot />
            </div>

            <div class="basis-12 grow-0 shrink-0 p-5">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts">
import type { PropType } from "vue";

export default defineComponent({
  name: "FDrawer",

  props: {
    modelValue: {
      type: Boolean,
      required: false,
      default: false,
    },

    position: {
      type: String as PropType<"right" | "left">,
      required: false,
      default: "left",
    },
  },

  emits: {
    "update:modelValue": (_val: boolean) => true,
  },

  setup(props, { emit }) {
    const visible = useVModel(props, "modelValue", emit);
    const { width } = useWindowSize();

    useOverlay(props.modelValue);

    watchEffect(() => {
      if (width.value > 1280) {
        visible.value = false;
      }
    });

    const target = ref(null);

    onClickOutside(target, () => (visible.value = false));

    const contentClass = computed(() => {
      const { position } = props;

      return {
        "left-0": position === "left",
        "right-0": position === "right",
      };
    });

    const transitionName = computed(() => `fade-slide-${props.position}`);

    const actionClass = computed(() => {
      const { position } = props;

      return {
        "justify-end": position === "left",
        "justify-start": position === "right",
      };
    });

    return { visible, target, contentClass, transitionName, actionClass };
  },
});
</script>

<style scoped>
.sidebar-container {
  @apply bg-black/30 fixed left-0 top-0 w-full h-full z-40;
}

.sidebar-content {
  @apply absolute  bottom-0 top-0;
  @apply w-full md:w-96;
}

/* left classes  */
.fade-slide-left-enter-from,
.fade-slide-left-leave-to,
.fade-slide-right-enter-from,
.fade-slide-right-leave-to {
  @apply opacity-0;
}

.fade-slide-left-enter-active,
.fade-slide-right-enter-active {
  @apply transition-opacity duration-100;
}
.fade-slide-left-leave-active,
.fade-slide-right-leave-active {
  @apply transition-opacity duration-100 delay-500;
}

/* position left classes  */
.fade-slide-left-enter-from .sidebar-content,
.fade-slide-left-leave-to .sidebar-content {
  @apply transform -translate-x-full;
}

/* position right classes  */
.fade-slide-right-enter-from .sidebar-content,
.fade-slide-right-leave-to .sidebar-content {
  @apply transform translate-x-full;
}

.fade-slide-left-leave-active .sidebar-content,
.fade-slide-right-leave-active .sidebar-content {
  @apply transition-transform duration-500 delay-100;
}
.fade-slide-left-enter-active .sidebar-content,
.fade-slide-right-enter-active .sidebar-content {
  @apply transition-transform duration-500;
}
</style>
