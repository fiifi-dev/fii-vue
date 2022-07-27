<template>
  <div class="flex flex-nowrap gap-5 items-center">
    <select v-model="perPage" class="f-form-control pl-2 py-1 text-sm">
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

    <div class="text-gray-500 text-sm">{{ offset }}/{{ count }}</div>

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
    const offset = computed(() => getNumber(props.pagination.offset) || 0);
    const limit = computed(() => getNumber(props.pagination.limit) || 10);
    const count = computed(() => getNumber(props.count) || 0);

    const hasNext = computed(() => limit.value * offset.value < count.value);
    const hasPrev = computed(() => offset.value > 1);

    const perPage = computed({
      get() {
        return limit.value;
      },

      set(val: number | string) {
        emit("update:pagination", {
          limit: val,
          offset: 1,
        });
      },
    });

    const handlePageChange = (action: "next" | "prev" = "next") => {
      let newOffset = offset.value || 1;

      if (action === "next" && hasNext.value) newOffset++;
      else if (action === "prev" && hasPrev.value) newOffset--;

      const data = {
        limit: limit.value,
        offset: newOffset,
      };

      emit("update:pagination", data);
    };

    return {
      perPage,
      hasPrev,
      hasNext,
      limit,
      offset,
      handlePageChange,
    };
  },
});
</script>

<style scoped>
.btn-pagination {
  @apply uppercase text-sm tracking-wider disabled:(opacity-40 cursor-default);
}
</style>
