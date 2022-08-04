import { diff } from "deep-diff";
import { computed, onMounted, ref } from "vue";
import { deepCopy } from "@/helpers/src/utils";

export const useDeepDiff = <T>(values: () => T | undefined) => {
  const clone = ref<T>();

  onMounted(() => {
    clone.value = deepCopy(values());
  });

  const isSame = computed(() => {
    const changes = diff(clone.value, values());
    if (changes) return false;
    return true;
  });

  const initializeClone = (values: T) => {
    clone.value = deepCopy(values);
  };

  return { isSame, initializeClone };
};
