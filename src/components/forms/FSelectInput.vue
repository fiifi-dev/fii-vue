<template>
  <FFormGroup v-bind="formGroupAttrs">
    <select
      v-model="value"
      :multiple="multiple"
      :disabled="disabled"
      :class="makeSelectClass({ size: size, block: block })"
      @change="handleChange"
    >
      <option
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        class="text-sm"
      >
        {{ item.label }}
      </option>
    </select>
  </FFormGroup>
</template>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
  name: "FSelectInput",

  props: {
    ...makeItemsProps(),
    ...makeFormGroupProps(),
    ...makeGeneralInputProps(),
    ...makeMultipleProps(),
    ...makeModelValueProps(),
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

    return {
      formGroupAttrs,
      value,
      handleChange,
      makeSelectClass,
    };
  },
});
</script>

<style scoped></style>
