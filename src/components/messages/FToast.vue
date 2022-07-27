<template>
  <Teleport to="body">
    <div class="fixed top-5 right-5 flex flex-col gap-2">
      <TransitionGroup>
        <div
          v-for="item in items"
          :key="`${item.id}`"
          :class="['f-toast', `f-toast-${item.variant}`]"
        >
          {{ item.message }}
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script lang="ts">
import type { Toast } from "@/helpers/buses";

export default defineComponent({
  name: "FToast",

  setup() {
    const delay = 5000;
    const interval = ref<number>();

    const bus = useEventBus(toastKey);
    type ToastItem = Toast & { time: number; id: string };
    const items = ref<ToastItem[]>([]);

    const handleRemoveItem = () => {
      if (items.value.length <= 0) return;

      const filteredItems = items.value.filter((e) => {
        return e.time - Date.now() > 0;
      });

      items.value = filteredItems;
    };

    bus.on((e) => {
      const oldItems = [...items.value];
      oldItems.unshift({ ...e, time: Date.now() + delay, id: uuid() });
      items.value = oldItems;
    });

    watch(items, (newVal, oldVal) => {
      if (newVal.length <= 0) {
        window.clearInterval(interval.value);
      } else if (oldVal.length <= 0 && newVal.length > 0) {
        interval.value = window.setInterval(handleRemoveItem, 500);
      }
    });

    return { items };
  },
});
</script>

<style scoped>
.f-toast {
  @apply max-w-xs shadow border mx-2 rounded-sm p-3 text-sm;
}

.f-toast-danger {
  @apply border-red-500 bg-red-100 text-red-500;
}

.f-toast-success {
  @apply border-green-500 bg-green-100 text-green-500;
}

.f-toast-light {
  @apply border-gray-400 bg-light-100 text-gray-600;
}

.f-toast-dark {
  @apply border-dark-900 bg-dark-700 text-light-50;
}

.v-enter-active,
.v-leave-active {
  @apply transition-all duration-300;
}
.v-enter-from,
.v-leave-to {
  @apply opacity-0;
  @apply transform translate-y-4;
}
</style>
