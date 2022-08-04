<template>
  <FFormGroup v-bind="formGroupAttrs">
    <textarea
      v-model="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :cols="cols"
      :rows="rows"
      @input="handleInput"
      :class="makeInputClass({ size: size, block: block, error: error })"
    />
  </FFormGroup>
</template>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
  name: "FTextarea",

  props: {
    ...makeFormGroupProps(),
    ...makeGeneralInputProps(),
    ...makeModelValueProps(),
    rows: {
      type: [String, Number],
      required: false,
      default: 3,
    },
    cols: {
      type: [String, Number],
      required: false,
      default: 3,
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
