<template>
  <div class="inline-block">
    <div id="trigger" ref="trigger" aria-describedby="tooltip">
      <slot />
    </div>

    <div id="tooltip" ref="tooltip" role="tooltip">
      {{ label }}
      <div id="arrow" data-popper-arrow></div>
    </div>
  </div>
</template>

<script lang="ts">
import { createPopper, type Instance, type Placement } from "@popperjs/core";
import { PropType } from "vue";

export default defineComponent({
  name: "FTooltip",

  props: {
    placement: {
      type: String as PropType<Placement>,
      required: false,
      default: "right",
    },

    label: {
      type: String,
      required: false,
      default: "",
    },
  },
  setup(props) {
    const trigger = ref<Element>();
    const tooltip = ref<HTMLElement>();
    let popperInstance: Instance;

    const show = () => {
      if (!tooltip.value) return;
      tooltip.value.setAttribute("data-show", "");

      // Enable the event listeners
      popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
          ...(options?.modifiers ? options?.modifiers : []),
          { name: "eventListeners", enabled: true },
        ],
      }));

      popperInstance.update();
    };

    const hide = () => {
      if (!tooltip.value) return;
      tooltip.value.removeAttribute("data-show");

      popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
          ...(options?.modifiers ? options?.modifiers : []),
          { name: "eventListeners", enabled: false },
        ],
      }));
    };

    onMounted(() => {
      if (!trigger.value) return;
      if (!tooltip.value) return;

      popperInstance = createPopper(trigger.value, tooltip.value, {
        placement: props.placement,
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
        ],
      });

      const showEvents = ["mouseenter", "focus"];
      const hideEvents = ["mouseleave", "blur"];

      showEvents.forEach((event) => {
        if (!trigger.value) return;
        trigger.value.addEventListener(event, show);
      });

      hideEvents.forEach((event) => {
        if (!trigger.value) return;
        trigger.value.addEventListener(event, hide);
      });
    });
    return { trigger, tooltip };
  },
});
</script>

<style scoped>
#trigger {
  @apply inline-block;
}

#tooltip {
  @apply hidden bg-gray-800 text-gray-100;
  @apply text-xs rounded-sm p-2 shadow;
}

#tooltip[data-show] {
  @apply block;
}

#arrow,
#arrow::before {
  @apply absolute h-8px w-8px;
  background: inherit;
}

#arrow {
  visibility: hidden;
}

#arrow::before {
  visibility: visible;
  content: "";
  transform: rotate(45deg);
}

#tooltip[data-popper-placement^="top"] > #arrow {
  bottom: -4px;
}

#tooltip[data-popper-placement^="bottom"] > #arrow {
  top: -4px;
}

#tooltip[data-popper-placement^="left"] > #arrow {
  right: -4px;
}

#tooltip[data-popper-placement^="right"] > #arrow {
  left: -4px;
}
</style>
