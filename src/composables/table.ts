import { type StyleValue } from "vue";

export const useTable = (props: { stickyHeader?: number; hover?: boolean }) => {
  const { stickyHeader, hover } = toRefs(props);

  const rowClass = computed(() => ({
    "cursor-pointer hover:bg-gray-100": hover?.value,
  }));

  const isScrollable = computed(() => {
    if (stickyHeader?.value === undefined) return false;
    return stickyHeader?.value > 0;
  });

  const wrapperStyles = computed<StyleValue>(() => ({
    maxHeight: isScrollable.value ? `${stickyHeader?.value}px` : "",
    overflowY: isScrollable.value ? "auto" : "visible",
    position: "relative",
  }));

  const thClass = computed(() => ({
    "f-sticky-header": isScrollable.value,
  }));

  return { rowClass, wrapperStyles, isScrollable, thClass };
};

export const useTableColSpan = (props: {
  headers: any[];
  showCheck: boolean;
}) => {
  const { headers, showCheck } = toRefs(props);

  const len = computed(() => {
    if (!showCheck?.value) return headers.value?.length;
    else return headers.value.length + 1;
  });
  return len;
};

export const useTableSelected = (
  props: {
    multiple?: boolean;
    idField?: string;
    selected?: Record<string, any> | Record<string, any>[];
    items?: Record<string, any>[];
  },

  emit: (name: "update:selected", value: any) => void
) => {
  const { selected, items, multiple, idField } = toRefs(props);

  const selectedItems = computed<Record<string, any>[]>(() => {
    if (selected?.value) {
      return [
        ...(Array.isArray(selected.value) ? selected.value : [selected.value]),
      ];
    } else {
      return [];
    }
  });

  const getIndex = (item: Record<string, any>) => {
    const index = selectedItems.value.findIndex((e) => {
      if (!idField?.value) return false;
      return e?.[idField.value] === item?.[idField.value];
    });

    return index;
  };

  const handleSelect = (value: Record<string, any>) => {
    if (multiple?.value) {
      let items: Record<string, any>[] = [...selectedItems.value];

      const index = getIndex(value);

      if (index >= 0) {
        items.splice(index, 1);
      } else {
        items.push(value);
      }
      emit("update:selected", items);
    } else {
      emit("update:selected", value);
    }
  };

  const isSelected = (item: Record<string, any>) => {
    const index = getIndex(item);
    return index >= 0;
  };

  const isAllSelected = computed(() => {
    if (!multiple?.value || !items?.value) return false;
    else return selectedItems.value.length === items?.value?.length;
  });

  const handleSelectAll = () => {
    if (!multiple?.value || !items?.value) return;
    if (selectedItems.value.length < items?.value?.length) {
      emit("update:selected", items.value);
    } else if (selectedItems.value.length === items?.value?.length) {
      emit("update:selected", []);
    }
  };

  return { isAllSelected, handleSelect, isSelected, handleSelectAll };
};
