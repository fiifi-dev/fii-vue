import type { PropType } from "vue";
import type { TableHeader } from "@/types";

export const makeSimpleTableProps = propsFactory({
  headers: {
    type: Array as PropType<TableHeader[]>,
    required: true,
  },

  items: {
    type: Array as PropType<Record<string, any>[]>,
    required: false,
    default: () => [],
  },

  stickyHeader: {
    type: Number,
    required: false,
  },

  small: {
    type: Boolean,
    required: false,
    default: false,
  },

  idField: {
    type: String,
    required: false,
    default: "id",
  },

  hover: {
    type: Boolean,
    required: false,
    default: false,
  },

  loading: {
    type: Boolean,
    required: false,
    default: false,
  },

  showCheck: {
    type: Boolean,
    required: false,
    default: false,
  },

  multiple: {
    type: Boolean,
    required: false,
    default: false,
  },

  selected: {
    type: [Object, Array] as PropType<
      Record<string, any> | Record<string, any>[]
    >,
    required: false,
  },
});

export const makePaginationProps = propsFactory({
  pageSizes: {
    type: Array as PropType<number[]>,
    required: false,
    default: () => [5, 10, 15, 20, 30],
  },

  page: {
    type: Number,
    required: false,
    default: 1,
    validator: (value: number) => {
      return value > 0;
    }
  },

  pageSize: {
    type: Number,
    required: false,
    default: 10,
    validator: (value: number) => {
      return value > 0;
    }
  },

  total: {
    type: Number,
    required: false,
    default: 0
  },


});

export const makePaginationEmits = () => ({
  "update:page": (_page: number) => true,
  "update:pageSize": (_size: number) => true,
});

export const makeTableEmits = () => ({
  "update:selected": (_value: Record<string, any> | Record<string, any>[]) =>
    true,
});
