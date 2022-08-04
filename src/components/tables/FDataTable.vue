<template>
  <div :class="[{ 'bg-light-50': showBg }, { border: showBorder }]">
    <div :class="['flex flex-col gap-5 mb-5 p-5']">
      <div class="flex flex-wrap justify-between items-center gap-5">
        <h3 v-if="showTitle && title" class="f-title">
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
          v-model="searchValue"
        />

        <div class="flex items-center gap-4">
          <button
            v-if="showReset"
            class="text-gray-700"
            @click="$emit('reset')"
          >
            <IFiiClockwise class="w-4 h-4" />
          </button>

          <slot name="actions">
            <FDropdown
              :items="actionMenu"
              :disabled="disableMenu"
              @key="$emit('action', $event)"
            >
              <span class="flex flex-nowrap gap-0.5">
                <span class="text-sm uppercase tracking-widest">Action</span>
                <IFiiCaretDown />
              </span>
            </FDropdown>
          </slot>
        </div>
      </div>
    </div>

    <div :style="wrapperStyles" class="f-wrapper">
      <table class="f-table">
        <thead class="f-thead">
          <tr>
            <th v-if="showCheck" :class="[thClass, 'f-th']">
              <input
                v-if="multiple"
                type="checkbox"
                class="f-checkbox"
                :checked="isAllSelected"
                @change="handleSelectAll()"
              />
            </th>

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
            <td class="f-td-addon" :colspan="colspan">
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
            <td v-if="showCheck" class="f-td">
              <input
                type="checkbox"
                class="f-checkbox"
                :checked="isSelected(item)"
                @change="handleSelect(item)"
              />
            </td>

            <td v-for="header in headers" :key="header.key" class="f-td">
              <slot :name="`cell(${header.key})`" :item="item" :index="index">
                {{ item?.[header.key] }}
              </slot>
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td class="f-td-addon" :colspan="colspan">
              <slot name="empty"> No items... </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="showPagination"
      :class="['py-10 flex items-center justify-end px-5']"
    >
      <slot name="pagination">
        <FPagination
          v-model:page="pageValue"
          v-model:pageSize="pageSizeValue"
          :page-sizes="pageSizes"
          :total="total"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import type { DropdownItem, Pagination } from "../../types/general";
import { PropType } from "vue";

export default defineComponent({
  name: "FDataTable",

  props: {
    ...makeSimpleTableProps(),
    ...makePaginationProps(),
    actionMenu: {
      type: Array as PropType<DropdownItem[]>,
      required: false,
      default: () => [
        { key: "update", label: "Update" },
        { key: "delete", label: "Delete" },
      ],
    },

    search: {
      type: String,
      required: false,
      default: "",
    },

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

    showBg: {
      type: Boolean,
      required: false,
      default: true,
    },

    showReset: {
      type: Boolean,
      required: false,
      default: true,
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
    ...makeTableEmits(),
    "update:search": (_value?: string) => true,
    action: (_value?: string) => true,
    create: () => true,
    reset: () => true,
  },

  setup(props, { emit }) {
    const { wrapperStyles, rowClass, thClass } = useTable(props);
    const colspan = useTableColSpan(props);
    const { handleSelect, handleSelectAll, isSelected, isAllSelected } =
      useTableSelected(props, emit);

    const disableMenu = computed(() => {
      if (!props.selected) return true;
      else if (Array.isArray(props.selected)) {
        return props.selected.length <= 0;
      } else return false;
    });

    const getSize = useGetSize(() => props.small);

    const pageSizeValue = useVModel(props, "pageSize", emit);
    const pageValue = useVModel(props, "page", emit);
    const searchValue = useVModel(props, "search", emit);

    return {
      wrapperStyles,
      rowClass,
      thClass,
      getSize,
      pageSizeValue,
      pageValue,
      searchValue,
      colspan,
      isAllSelected,
      disableMenu,
      handleSelectAll,
      handleSelect,
      isSelected,
    };
  },
});
</script>

<style scoped>
.f-title {
  @apply uppercase tracking-wider text-gray-600 self-stretch;
  @apply text-sm flex items-center flex-nowrap gap-3 divide-x;
}
</style>
