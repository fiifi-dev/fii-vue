<template>
  <div :class="showBorder ? 'border' : ''">
    <div :class="['flex flex-col gap-5 mb-5', showBorder ? 'p-5' : '']">
      <div class="flex flex-wrap justify-between items-center gap-5">
        <h3 v-if="showTitle" class="f-title">
          <slot name="title">
            <span class="text-gray-500">{{ title }}</span>
            <span class="h-full border mx-3"></span>
          </slot>
        </h3>

        <FBtn :size="getSize" @click="$emit('create')">
          <slot name="create">Create</slot>
        </FBtn>
      </div>

      <div class="flex flex-wrap justify-between gap-5">
        <FSearchInput
          placeholder="Search items"
          :size="getSize"
          @click="$emit('search')"
        />

        <div>
          <slot name="actions" />
        </div>
      </div>
    </div>

    <div :style="wrapperStyles" class="f-wrapper">
      <table class="f-table">
        <thead class="f-thead">
          <tr>
            <th
              v-for="(header, index) in headers"
              :key="header.key"
              :class="[thClass, 'f-th']"
            >
              <slot
                :name="`head(${header.key})`"
                :header="header"
                :index="index"
              >
                {{ header.label }}
              </slot>
            </th>
          </tr>
        </thead>

        <tbody v-if="loading">
          <tr>
            <td class="f-td-addon" :colspan="headers.length">
              <slot name="loading"> Loading... </slot>
            </td>
          </tr>
        </tbody>

        <tbody v-if="items.length > 0">
          <tr
            v-for="(item, index) in items"
            :key="item?.[idField]"
            :class="['bg-white', rowClass]"
          >
            <td v-for="header in headers" :key="header.key" class="f-td">
              <slot :name="`cell(${header.key})`" :item="item" :index="index">
                {{ item?.[header.key] }}
              </slot>
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td class="f-td-addon" :colspan="headers.length">
              <slot name="empty"> No items... </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showPagination" class="py-10 flex items-center justify-end">
      <slot name="pagination">
        <FPagination
          v-model:pagination="paginationData"
          :page-sizes="pageSizes"
          :count="count"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import type { Pagination } from "@/types";

export default defineComponent({
  name: "FDataTable",

  props: {
    ...makeSimpleTableProps(),
    ...makePaginationProps(),
    title: {
      type: String,
      required: false,
      default: "",
    },

    showBorder: {
      type: Boolean,
      required: false,
      default: false,
    },

    showPagination: {
      type: Boolean,
      required: false,
      default: true,
    },

    showCreate: {
      type: Boolean,
      required: false,
      default: true,
    },

    showSearch: {
      type: Boolean,
      required: false,
      default: true,
    },

    showTitle: {
      type: Boolean,
      required: false,
      default: true,
    },
    // Pagination
  },

  emits: {
    ...makePaginationEmits(),
    search: (_value?: string) => true,
    create: () => true,
  },

  setup(props, { emit }) {
    const { wrapperStyles, rowClass, thClass } = useTable(() => props);

    const getSize = useGetSize(() => props.small);

    const paginationData = computed<Pagination>({
      get() {
        return props.pagination;
      },

      set(val) {
        emit("update:pagination", val);
      },
    });

    return { wrapperStyles, rowClass, thClass, getSize, paginationData };
  },
});
</script>

<style scoped>
.f-title {
  @apply uppercase tracking-wider text-gray-600 self-stretch;
  @apply text-sm flex items-center flex-nowrap gap-3 divide-x;
}
</style>
