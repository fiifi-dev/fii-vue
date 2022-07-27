import type { PropType } from "vue";
import type { Numeric, Pagination, TableHeader } from "@/types";

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
});

export const makePaginationProps = propsFactory({
  pageSizes: {
    type: Array as PropType<Numeric[]>,
    required: false,
    default: () => [5, 10, 15, 20, 30],
  },

  count: {
    type: [Number, String],
    required: false,
    default: 0,
  },

  pagination: {
    type: Object as PropType<Pagination>,
    required: false,
    default: () => ({
      offset: 0,
      limit: 10,
    }),
  },
});

export const makePaginationEmits = () => ({
  "update:pagination": (data: Pagination) => true,
});
