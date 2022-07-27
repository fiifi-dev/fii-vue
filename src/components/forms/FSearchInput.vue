<template>
  <FFormGroup v-bind="formGroupAttrs">
    <div class="flex items-center flex-nowrap">
      <input
        v-model="value"
        :placeholder="placeholder"
        :disabled="disabled"
        type="text"
        :class="[
          ...makeInputClass({
            size: size,
            error: error,
            block: block,
          }),
          '!rounded-r-none',
        ]"
        @input="handleInput"
      />

      <button :class="['f-append-btn']">
        <FSearchIcon :class="[size === 'sm' ? 'w-3 h-3' : 'w-5 h-5']" />
      </button>
    </div>
  </FFormGroup>
</template>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
  name: "FSearchInput",

  props: {
    ...makeFormGroupProps(),
    ...makeGeneralInputProps(),
    ...makeModelValueProps(),
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

    return {
      formGroupAttrs,
      value,
      handleInput,
      makeInputClass,
    };
  },
});
</script>

<style scoped></style>
