<template>
  <div :style="wrapperStyles" class="f-wrapper">
    <table class="f-table">
      <thead class="f-thead">
        <tr>
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
</template>

<script lang="ts">
export default defineComponent({
  name: "FSimpleTable",

  props: {
    ...makeSimpleTableProps(),
  },

  setup(props) {
    const { wrapperStyles, rowClass, thClass } = useTable(() => props);

    return { wrapperStyles, rowClass, thClass };
  },
});
</script>

<style scoped></style>
