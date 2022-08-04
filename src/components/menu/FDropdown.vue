<template>
  <div class="inline-block">
    <button
      id="trigger"
      ref="trigger"
      class="f-trigger"
      aria-describedby="menu"
      @click="show"
      :disabled="disabled"
    >
      <slot />
    </button>

    <div id="menu" ref="menu" role="menu">
      <ul>
        <li
          v-for="item in items"
          :key="item.key"
          class="f-menu"
          @click="handleClick(item)"
        >
          <Component v-if="item.icon" :is="item.icon" class="w-4 h-4" />
          <span>{{ item.label }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import type { DropdownItem, Size } from "../../types/general";
import { createPopper, type Instance } from "@popperjs/core";
import { PropType } from "vue";

export default defineComponent({
  name: "FMenu",



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
          // {
          //   name: "offset",
          //   options: {
          //     offset: [0, 8],
          //   },
          // },
          {
            name: "preventOverflow",
            options: {
              padding: 8,
            },
          },
        ],
      });
    });

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
  @apply text-xs rounded-sm p-2 shadow z-10;
}

#menu[data-show] {
  @apply block;
}

.f-menu {
  @apply p-2 rounded-sm text-sm uppercase tracking-widest;
  @apply whitespace-nowrap overflow-hidden text-gray-600;
  @apply hover:(bg-gray-200 cursor-pointer bg-opacity-40);
  @apply flex flex-nowrap items-center  gap-3 transition-all;
}

.f-trigger {
  @apply disabled:(cursor-default opacity-50);
}
</style>
