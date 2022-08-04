import type { Size } from "@/types/general";
import type { PropType, StyleValue } from "vue";

export const makeLayoutProps = propsFactory({
  size: {
    type: String as PropType<Size>,
    required: false,
    default: "md",
  },

  block: {
    type: Boolean,
    required: false,
    default: false,
  },

  bgClass: {
    type: [Object, String] as PropType<StyleValue>,
    required: false,
    default: "",
  },

  bgStyle: {
    type: Object as PropType<StyleValue>,
    required: false,
    default: () => ({}),
  },
});
