<template>
  <div class="relative inline-block">
    <button
      :disabled="disabled"
      class="disabled:(opacity-50 cursor-default)"
      @click="handleShow"
    >
      <slot name="action">Menu</slot>
    </button>

    <ul ref="target" :class="['f-dropdown-menu', canShow ? 'block' : 'hidden']">
      <li
        v-for="item in items"
        :key="item.key"
        :class="['f-dropdown-item', `f-dropdown-${size}`]"
        @click="handleClick(item.key)"
      >
        <Icon :icon="item.icon" class="w-4 h-4" />
        <span>
          <slot :name="`item(${item.key})`">{{ item.label }}</slot>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Icon } from "@iconify/vue";
import type { DropdownItem, Size } from "@/types";
import type { PropType } from "vue";

export default defineComponent({
  name: "FDropdown",

  components: { Icon },

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
    const show = ref(false);

    const target = ref(null);

    const canShow = computed(() => {
      if (props.disabled) return false;
      return show.value;
    });

    onClickOutside(target, (_) => (show.value = false));

    const handleShow = () => {
      show.value = !show.value;
    };

    const handleClick = (e?: string) => {
      emit("key", e);
      show.value = false;
    };

    return { show, target, canShow, handleShow, handleClick };
  },
});
</script>

<style scoped>
.f-dropdown-menu {
  @apply absolute bg-white;
  @apply shadow p-2 rounded-sm;
}

.f-dropdown-item {
  @apply text-sm text-gray-600 tracking-wide p-2 w-35;
  @apply hover:(bg-gray-100 cursor-pointer);
  @apply flex items-center gap-2;
}

.f-dropdown-sm {
  @apply w-35;
}

.f-dropdown-md {
  @apply w-50;
}

.f-dropdown-lg {
  @apply w-60;
}
</style>
