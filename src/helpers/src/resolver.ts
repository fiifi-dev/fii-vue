import type { ComponentResolver } from "unplugin-vue-components";

export const FiiVueResolver = (): ComponentResolver => {
  return {
    type: "component",
    resolve: (name: string) => {
      if (name.match(/^(F[A-Z]|n-[a-z])/)) return { name, from: "fii-vue" };
    },
  };
};
