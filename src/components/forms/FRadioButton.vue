<template>
  <div class="inline-block">
    <label :class="['.f-label', disabled ? 'opacity-50' : '']">
      <input
        type="radio"
        :disabled="disabled"
        :value="value"
        v-model="vModel"
        class="f-radio"
        @change="handleChange"
      />
      <span :class="makeInputLabelClass(size)">{{ label }}</span>
    </label>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
  name: "FRadiobutton",

  props: {
    label: {
      type: String,
      required: false,
      default: "",
    },
    value: {
      type: null,
      required: false,
      default: false,
    },
    ...makeModelValueProps(),
    ...getObjSubset(makeGeneralInputProps(), ["disabled", "size"]),
  },

  emits: {
    ...makeModelValueEmits(),
    ...makeChangeEmits(),
  },
  setup(props, { emit }) {
    const formGroupAttrs = useFormGroup(() => props);

    const vModel = useVModel(props, "modelValue", emit);

    const handleChange = (e: Event) => {
      const target = e?.target as HTMLInputElement;
      emit("change", target?.value);
    };

    return { vModel, formGroupAttrs, handleChange, makeInputLabelClass };
  },
});
</script>

<style scoped>
.f-radio {
  @apply border-primary-200;
  @apply text-primary-100 focus:(ring-primary-200);
}

.f-label {
  @apply flex items-center gap-3 m-auto;
}
</style>
