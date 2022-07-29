<template>
  <div class="inline-block">
    <div id="trigger" ref="trigger" aria-describedby="menu" @click="show">
      <slot />
    </div>

    <div id="menu" ref="menu" role="menu" coco>
      <ul>
        <li
          v-for="item in items"
          :key="item.key"
          class="f-menu"
          @click="handleClick(item)"
        >
          <Icon v-if="item.icon" :icon="item.icon" class="w-5 h-5" />
          <span>{{ item.label }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Icon } from "@iconify/vue";
import type { DropdownItem, Size } from "@/types";
import { createPopper, type Instance, type Placement } from "@popperjs/core";
import { PropType } from "vue";

export default defineComponent({
  name: "FMenu",

  components: { Icon},

  props: {
    size: {
      type: String as PropType<Size>,
      required: false,
      default: "sm",
    },

    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },

    placement: {
      type: String as PropType<Placement>,
      required: false,
      default: "right",
    },

    items: {
      type: Array as PropType<DropdownItem[]>,
      required: false,
      default: () => [],
    },
  },

  emits: {
    key: (_e?: string) => true,
  },

  setup(props, { emit }) {
    const trigger = ref<Element>();
    const menu = ref<HTMLElement>();
    let popperInstance: Instance;

    const show = () => {
      if (!menu.value) return;
      menu.value.setAttribute("data-show", "");

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
      if (!menu.value) return;
      menu.value.removeAttribute("data-show");

      popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
          ...(options?.modifiers ? options?.modifiers : []),
          { name: "eventListeners", enabled: false },
        ],
      }));
    };

    onClickOutside(menu, (_) => hide());

    const router = useRouter();

    const handleClick = (item: DropdownItem) => {
      if (!item.to) emit("key", item.key);
      else router.push(item.to);
      hide();
    };

    onMounted(() => {
      if (!trigger.value) return;
      if (!menu.value) return;

      popperInstance = createPopper(trigger.value, menu.value, {
        placement: "bottom",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
        ],
      });
    });

    // const handleShow = () => {
    //   if (!menu.value) return;
    //   const hasIt = menu.value.hasAttribute("data-show");
    //   console.log(menu.value.hasAttribute("data-show"));
    //   if (hasIt) hide();
    //   else show();
    // };

    return {
      trigger,
      menu,
      show,
      handleClick,
    };
  },
});
</script>

<style scoped>
#trigger {
  @apply inline-block;
}

#menu {
  @apply hidden bg-white text-gray-800;
  @apply text-xs rounded-sm p-2 shadow;
}

#menu[data-show] {
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

#menu[data-popper-placement^="top"] > #arrow {
  bottom: -4px;
}

#menu[data-popper-placement^="bottom"] > #arrow {
  top: -4px;
}

#menu[data-popper-placement^="left"] > #arrow {
  right: -4px;
}

#menu[data-popper-placement^="right"] > #arrow {
  left: -4px;
}

.f-menu {
  @apply p-2 rounded-sm text-sm uppercase tracking-widest;
  @apply whitespace-nowrap overflow-hidden text-gray-600;
  @apply hover:(bg-gray-200 cursor-pointer bg-opacity-40);
  @apply flex flex-nowrap items-center  gap-3 transition-all;
}
</style>
