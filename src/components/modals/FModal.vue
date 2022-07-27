<template>
  <Teleport to="body">
    <Transition name="wrapper" :duration="300">
      <div v-if="visible" class="modal-container">
        <div class="modal-wrapper">
          <div class="modal-body" :class="`modal-${size}`">
            <div class="flex justify-end">
              <IFiiClose class="f-modal-close" @click="handleClose" />
            </div>
            <div class="py-3">
              <slot :visible="visible" :handleClose="handleClose" />
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
  name: "FModal",

  props: {
    size: {
      type: String as PropType<"xs" | "sm" | "md" | "lg" | "xl">,
      required: false,
      default: "md",
    },
    modelValue: {
      type: Boolean,
      default: false,
      required: false,
    },
  },

  emits: {
    "update:modelValue": (_value: boolean) => true,
  },

  setup(props, { emit }) {
    useOverlay(props.modelValue);

    const visible = useVModel(props, "modelValue", emit);
    const handleClose = () => {
      emit("update:modelValue", false);
    };
    return { visible, handleClose };
  },
});
</script>

<style scoped>
.modal-xs {
  @apply w-80;
}
.modal-sm {
  @apply w-120;
}
.modal-md {
  @apply w-150;
}
.modal-lg {
  @apply w-200;
}
.modal-xl {
  @apply w-300;
}

.f-modal-close {
  @apply h-6 w-6 text-gray-500 hover:(cursor-pointer text-gray-600);
}

.modal-container {
  @apply fixed top-0 left-0 right-0 bottom-0 overflow-hidden;
  @apply bg-black/20;
  @apply z-9998;
}
.modal-wrapper {
  @apply flex items-center justify-center w-full h-full;
  @apply overflow-y-auto p-5;
}

.modal-body {
  @apply bg-white rounded-sm shadow;
  @apply m-auto p-3;
}

.wrapper-leave-active {
  @apply transition-opacity duration-50;
  @apply delay-10000;
}

.wrapper-enter-active {
  @apply transition-opacity duration-50;
}

.wrapper-leave-active .modal-body {
  @apply transition-all duration-200;
}

.wrapper-enter-active .modal-body {
  @apply transition-all duration-200;
  @apply delay-50;
}
.wrapper-leave-active .modal-body {
  @apply transition-all duration-200;
}

.wrapper-enter-from,
.wrapper-leave-to {
  opacity: 0;
}

.wrapper-enter-from .modal-body,
.wrapper-leave-to .modal-body {
  @apply transform scale-80;
  @apply opacity-0;
}
</style>
