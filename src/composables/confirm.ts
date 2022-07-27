import { confirmKey, confirmResolveKey } from "@/helpers/buses";
import { useEventBus } from "@vueuse/core";
import { ref } from "vue";

export const useConfirm = (msg: string = "Are you sure?") => {
  const confirmBus = useEventBus(confirmKey);
  const resolveBus = useEventBus(confirmResolveKey);

  const promiseResolve = ref<(value: boolean) => void>();

  resolveBus.on((value) => {
    promiseResolve.value?.(value);
  });

  const _confirm = () => {
    return new Promise<boolean>((resolve) => {
      promiseResolve.value = resolve;
      confirmBus.emit(msg);
    });
  };

  return _confirm();
};
