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
