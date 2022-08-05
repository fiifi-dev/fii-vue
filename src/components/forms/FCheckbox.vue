<template>
  <div class="inline-block">
    <label :class="['f-label', disabled ? 'opacity-50' : '']">
      <input
        type="checkbox"
        :disabled="disabled"
        :false-value="falseValue"
        :true-value="trueValue"
        v-model="value"
        class="f-checkbox"
        @change="handleChange"
      />
      <span :class="makeInputLabelClass(size)">{{ label }}</span>
    </label>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
  name: "FCheckbox",

  props: {
    ...getObjSubset(makeGeneralInputProps(), ["disabled", "size"]),
    ...makeModelValueProps(),
    label: {
      type: String,
      required: false,
      default: "",
    },
    falseValue: {
      type: null,
      required: false,
      default: false,
    },
    trueValue: {
      type: null,
      required: false,
      default: true,
    },
  },

  emits: {
    ...makeModelValueEmits(),
    ...makeChangeEmits(),
  },

  setup(props, { emit }) {
    const formGroupAttrs = useFormGroup(() => props);

    const value = useVModel(props, "modelValue", emit);

    const handleChange = (e: Event) => {
      const target = e?.target as HTMLInputElement;
      emit("change", target?.value);
    };

    return { value, formGroupAttrs, handleChange, makeInputLabelClass };
  },
});
</script>

<style scoped></style>
