import { diff } from "deep-diff";
import { computed, onMounted, ref } from "vue";
import { deepCopy } from "@/helpers/utils";

export const useDeepDiff = <T>(value: () => T) => {
  const clone = ref<T>();

  onMounted(() => {
    clone.value = deepCopy(value());
  });

  const isSame = computed(() => {
    const changes = diff(clone.value, value());
    if (changes) return false;
    return true;
  });

  const initializeClone = (values: T) => {
    clone.value = deepCopy(values);
  };

  return { isSame, initializeClone };
};