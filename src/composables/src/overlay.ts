export const useOverlay = (visible: boolean, paddingRight: number = 8) => {
  const setDomBody = (add = false) => {
    if (add) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${paddingRight}px`;
      document.body.classList.add("body-overlay");
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.body.classList.remove("body-overlay");
    }
  };

  watch(
    () => visible,
    (val: boolean) => {
      if (val) {
        setTimeout(() => {
          setDomBody(true);
        }, 0);
      } else {
        setTimeout(() => {
          setDomBody();
        }, 600);
      }
    }
  );
};
