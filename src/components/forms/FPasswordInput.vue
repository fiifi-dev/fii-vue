<template>
  <FFormGroup v-bind="formGroupAttrs">
    <div class="flex items-center flex-nowrap">
      <input
        v-model="value"
        :placeholder="placeholder"
        :disabled="disabled"
        :type="inputType"
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

      <button
        :class="[
          'f-append-btn',
          size === 'sm' ? 'children:(w-3 h-3)' : 'children:(w-5 h-5)',
        ]"
        @click="handleType"
      >
        <FEyeIcon v-if="inputType === 'password'" />
        <FEyeSlashIcon v-else />
      </button>
    </div>
  </FFormGroup>
</template>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
  name: "FPasswordInput",

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

    type InputType = "text" | "password";
    const inputType = ref<InputType>("password");

    const value = useVModel(props, "modelValue", emit);

    const handleType = () => {
      if (inputType.value == "text") return (inputType.value = "password");
      if (inputType.value == "password") return (inputType.value = "text");
    };

    const handleInput = (e: Event) => {
      const target = e?.target as HTMLInputElement;
      emit("input", target?.value);
    };

    return {
      formGroupAttrs,
      value,
      inputType,
      handleInput,
      makeInputClass,
      handleType,
    };
  },
});
</script>

<style scoped></style>
