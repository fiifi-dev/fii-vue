<template>
  <div class="flex flex-nowrap gap-5 items-center">
    <select v-model="pageSizeValue" class="f-form-control pl-2 py-1 text-sm">
      <option v-for="pageSize in pageSizes" :key="pageSize" :value="pageSize">
        {{ pageSize }}
      </option>
    </select>

    <button
      :disabled="!hasPrev"
      class="btn-pagination"
      @click="handlePageChange('prev')"
    >
      Prev
    </button>

    <div class="text-gray-500 text-sm">{{ page }}/{{ total }}</div>

    <button
      :disabled="!hasNext"
      class="btn-pagination"
      @click="handlePageChange('next')"
    >
      Next
    </button>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: "FPagination",

  props: {
    ...makePaginationProps(),
  },

  emits: {
    ...makePaginationEmits(),
  },
  setup(props, { emit }) {
    const { page, pageSize, total } = toRefs(props);

    const hasNext = computed(() => page.value * pageSize.value < total.value);
    const hasPrev = computed(() => page.value > 1);

    const handlePageChange = (action: "next" | "prev" = "next") => {
      let newPage = page.value || 1;

      if (action === "next" && hasNext.value) newPage++;
      else if (action === "prev" && hasPrev.value) newPage--;

      emit("update:page", newPage);
    };

    const pageSizeValue = computed({
      get: () => props.pageSize,
      set: (size: number) => {
        emit("update:page", 1);
        emit("update:pageSize", size);
      },
    });

    return {
      hasPrev,
      hasNext,
      pageSizeValue,
      handlePageChange,
    };
  },
});
</script>

<style scoped>
.btn-pagination {
  @apply uppercase text-sm tracking-wider disabled: (opacity-40 cursor-default);
}
</style>
