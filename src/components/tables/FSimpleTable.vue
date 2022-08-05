<template>
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
            <slot :name="`head(${header.key})`" :header="header" :index="index">
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

      <tbody v-else-if="items.length > 0">
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
</template>

<script lang="ts">
export default defineComponent({
  name: "FSimpleTable",

  props: {
    ...makeSimpleTableProps(),
  },

  emits: {
    ...makeTableEmits(),
  },

  setup(props, { emit }) {
    const { wrapperStyles, rowClass, thClass } = useTable(props);
    const colspan = useTableColSpan(props);
    const { handleSelect, handleSelectAll, isSelected, isAllSelected } =
      useTableSelected(props, emit);

    return {
      wrapperStyles,
      rowClass,
      thClass,
      colspan,
      isAllSelected,
      handleSelectAll,
      handleSelect,
      isSelected,
    };
  },
});
</script>

<style scoped></style>
