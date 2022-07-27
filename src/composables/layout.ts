import { Size } from "@/types";

export const useLayout = (
  props: () => { size?: Size; block?: boolean }
) => {
  const propsData = props();

  const sizes: Record<Size, string> = {
    sm: "w-80",
    md: "w-100",
    lg: "w-160",
  };

  const getSize = computed(() => {
    if (!propsData.size) return "";
    return sizes[propsData.size];
  });

  const contentClass = computed(() => [
    getSize.value,
    propsData.block ? "w-full" : "",
    "m-auto",
    "p-5",
  ]);

  return { contentClass };
};