<template>
  <label>
    <div class="text-sm text-gray-600">
      <slot name="label"> {{ label }}</slot>
      {{ required ? "*" : "" }}
    </div>

    <div>
      <slot />
    </div>

    <div
      class="text-xs"
      :class="[
        error ? 'text-red-600' : 'text-gray-500',
        hasDescription ? 'my-1' : '',
      ]"
    >
      <slot name="error">{{ error || hint }}</slot>
    </div>
  </label>
</template>

<script lang="ts">
export default defineComponent({
  name: "FFormGroup",

  props: {
    ...makeFormGroupProps(),
  },

  setup(props, { slots }) {
    const hasDescription = computed(() => {
      return slots?.error?.() || props.error || props.hint;
    });

    return {
      hasDescription,
    };
  },
});
</script>
