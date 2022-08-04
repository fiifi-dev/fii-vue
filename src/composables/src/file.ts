import type { Ref } from "vue";

export const useHasFile = <T = unknown>(file: Ref<T>, url: () => string) => {
  return computed(() => !file.value || !url());
};
