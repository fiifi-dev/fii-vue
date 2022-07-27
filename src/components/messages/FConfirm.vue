<template>
  <Transition>
    <div v-if="show" class="f-confirm">
      <div class="absolute min-w-xs bg-white rounded shadow p-5">
        <div class="text-sm text-gray-600 py-5">
          {{ msg }}
        </div>
        <div class="flex items-center justify-end gap-5">
          <FBtn variant="danger" size="sm" @click="handleConfirm(false)">
            Cancel
          </FBtn>
          <FBtn size="sm" @click="handleConfirm(true)">Confirm</FBtn>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
export default defineComponent({
  name: "FConfirm",

  setup() {
    const msg = ref<string>("Are you sure?");
    const show = ref(false);

    const confirmBus = useEventBus(confirmKey);
    const resolveBus = useEventBus(confirmResolveKey);

    confirmBus.on((e) => {
      msg.value = e || "Are you sure?";
      show.value = true;
    });

    const handleConfirm = (value: boolean) => {
      resolveBus.emit(value);
      show.value = false;
    };

    return { msg, show, handleConfirm };
  },
});
</script>

<style scoped>
.f-confirm {
  @apply fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center;
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
