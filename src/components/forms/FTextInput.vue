<template>
  <FFormGroup v-bind="formGroupAttrs">
    <input
      v-model="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :type="type"
      @input="handleInput"
      :class="makeInputClass({ size: size, block: block, error: error })"
    />
  </FFormGroup>
</template>

<script lang="ts">
import { PropType } from "vue";

type InputType =
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

export default defineComponent({
  inheritAttrs: false,
  name: "FTextInput",

  props: {
    ...makeFormGroupProps(),
    ...makeGeneralInputProps(),
    ...makeModelValueProps(),
    type: {
      type: String as PropType<InputType>,
      required: false,
      default: "text",
    },
  },

  emits: {
    ...makeModelValueEmits(),
    ...makeInputEmits(),
  },

  setup(props, { emit }) {
    const formGroupAttrs = useFormGroup(() => props);
    const value = useVModel(props, "modelValue", emit);

    const handleInput = (e: Event) => {
      const target = e?.target as HTMLInputElement;
      emit("input", target?.value);
    };

    return { formGroupAttrs, value, handleInput, makeInputClass };
  },
});
</script>

<style scoped></style>
