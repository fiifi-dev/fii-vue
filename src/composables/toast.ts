import { Toast, toastKey } from "@/helpers/buses";
import { useEventBus } from "@vueuse/core";

export const useToast = (
  msg?: Toast["message"],
  variant: Toast["variant"] = "success"
) => {
  const bus = useEventBus(toastKey);

  const _toast = () => {
    bus.emit({ message: msg, variant: variant });
  };

  return _toast();
};
