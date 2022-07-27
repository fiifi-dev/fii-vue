import { PropType } from "vue";
import { propsFactory } from "@/helpers/propsFactory";
import { makePaddingY, makeTextSize } from "@/helpers/utils";
import { SelectOption, Size } from "@/types";

export type InputType =
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "range"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

export const makeFormGroupProps = propsFactory({
  label: {
    type: String,
    required: false,
    default: "",
  },

  hint: {
    type: String,
    required: false,
    default: "",
  },

  error: {
    type: String,
    required: false,
    default: "",
  },

  required: {
    type: Boolean,
    required: false,
    default: false,
  },
});

export const makeGeneralInputProps = propsFactory({
  placeholder: {
    type: String,
    required: false,
  },

  block: {
    type: Boolean,
    required: false,
    default: false,
  },

  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },

  size: {
    type: String as PropType<Size>,
    required: false,
    default: "md",
  },
});

export const makeItemsProps = propsFactory({
  items: {
    type: Array as PropType<SelectOption[]>,
    required: false,
    default: () => [],
  },
});

export const makeMultipleProps = propsFactory({
  multiple: {
    type: Boolean,
    required: false,
    default: false,
  },
});

export const makeModelValueProps = propsFactory({
  modelValue: {
    type: null,
    required: false,
  },
});

export const makeModelValueEmits = () => ({
  "update:modelValue": (_value: any) => true,
});

export const makeInputEmits = () => ({
  input: (_value: any) => true,
});

export const makeChangeEmits = () => ({
  change: (_value: any) => true,
});

export const formSizeAttr = (size: Size) => {
  if (size == "sm") return ["text-xs", "py-1 px-2"];
  if (size == "md") return ["", "p-2"];
  return ["text-lg", "p-3"];
};

export const makeInputClass = (props: {
  size: Size;
  error?: boolean | string;
  block?: boolean;
}) => {
  return [
    ...makeTextSize(props.size),
    ...makePaddingY(props.size),
    "f-form-control px-2 form-input disabled:(opacity-50)",
    props.error ? "!border-red-600" : "",
    props.block ? "w-full" : "w-full max-w-xs",
  ];
};

export const makeSelectClass = (props: { size: Size; block?: boolean }) => {
  return [
    ...makeTextSize(props.size),
    ...makePaddingY(props.size),
    "f-form-control pl-3 pr-10",
    props.block ? "w-full" : "",
  ];
};

export const makeInputLabelClass = (size: Size) => {
  return [...makeTextSize(size), "text-gray-600"];
};