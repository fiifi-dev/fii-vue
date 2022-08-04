export const useFormGroup = (
  props: () => {
    label?: string;
    hint?: string;
    error?: string;
    required?: boolean;
  }
) => {
  const propsData = props();

  return computed(() => ({
    label: propsData.label,
    hint: propsData.hint,
    error: propsData.error,
    required: propsData.required,
  }));
};
