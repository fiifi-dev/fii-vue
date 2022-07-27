import { type StyleValue } from "vue";

export const useTable = (
  props: () => Readonly<{ stickyHeader?: number; hover?: boolean }>
) => {
  const propData = props();

  const rowClass = computed(() => ({
    "cursor-pointer hover:bg-gray-100": propData.hover,
  }));

  const isScrollable = computed(() => {
    if (propData?.stickyHeader === undefined) return false;
    return propData?.stickyHeader > 0;
  });

  const wrapperStyles = computed<StyleValue>(() => ({
    maxHeight: isScrollable.value ? `${propData.stickyHeader}px` : "",
    overflowY: isScrollable.value ? "auto" : "visible",
    position: "relative",
  }));

  const thClass = computed(() => ({
    "f-sticky-header": isScrollable.value,
  }));

  return { rowClass, wrapperStyles, isScrollable, thClass };
};
