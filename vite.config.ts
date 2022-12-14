import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";
import AutoImport from "unplugin-auto-import/vite";

import Icons from "unplugin-icons/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    WindiCSS(),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        {
          "@vueuse/core": [
            "useVModel",
            "useStorage",
            "useMediaQuery",
            "useEventBus",
            "onClickOutside",
            "useWindowScroll",
            "useWindowSize",
          ],
        },
      ],

      dirs: ["./src/composables/src", "./src/helpers/src"],
      dts: "./src/auto-imports.d.ts",
    }),
    Components({
      dts: "./src/components.d.ts",
      resolvers: [
        IconsResolver({
          customCollections: ["fii"],
        }),
      ],
      types: [
        {
          from: "vue-router",
          names: ["RouterLink", "RouterView"],
        },
      ],
    }),
    Icons({
      compiler: "vue3",
      autoInstall: true,
      customCollections: {
        fii: FileSystemIconLoader("./src/assets/icons"),
      },
    }),
  ],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    dedupe: ["vue", "@vueuse/core", "@vueuse/integrations", "vue-router"],
  },

  optimizeDeps: {
    include: ["@popperjs/core", "deep-diff"],
  },

  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "fii-vue",
      //  formats: ["es"], // adding 'umd' requires globals set to every external module
      // fileName: (format) => `fii-vue.${format}.js`,
    },
    rollupOptions: {
      // external modules won't be bundled into your library
      external: ["vue", "vue-router"], // not every external has a global
      output: {
        // disable warning on src/index.ts using both default and named export
        exports: "named",
        // Provide global variables to use in the UMD build
        // for externalized deps (not useful if 'umd' is not in lib.formats)
        globals: {
          vue: "Vue",
          "vue-router": "VueRouter",
        },
      },
    },
    // emptyOutDir: false, // to retain the types folder generated by tsc
  },
});
