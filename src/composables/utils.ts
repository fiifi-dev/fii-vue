import { Size } from "@/types";
import { computed } from "vue";

export const useGetSize = (size: () => Size | boolean) => {
  // set to boolean true if small
  const sizeData = size();

  return computed(() => {
    let parseSize: Size = "md";
    if (typeof sizeData === "boolean") {
      if (sizeData) parseSize = "sm";
      else parseSize = "md";
    } else {
      parseSize = sizeData;
    }

    return parseSize;
  });
};
