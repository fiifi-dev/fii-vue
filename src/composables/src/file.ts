import type { Ref } from "vue";

export const useHasFile = <T = unknown>(
  file: Ref<T>,
  url: () => string | undefined
) => {
  return computed(() => {
    const hasNotFile = !file.value && !url();
    return !hasNotFile;
  });
};
