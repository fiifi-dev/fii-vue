import { defineConfig } from "windicss/helpers";
import formsPlugin from "windicss/plugin/forms";
import colors from "windicss/colors";

export default defineConfig({
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          100: "var(--primary-color-100)",
          200: "var(--primary-color-200)",
          300: "var(--primary-color-300)",
        },

        danger: {
          100: colors.red["600"],
          200: colors.red["700"],
          300: colors.red["800"],
        },

        success: {
          100: colors.green["600"],
          200: colors.green["700"],
          300: colors.green["800"],
        },

        warning: {
          100: colors.yellow["600"],
          200: colors.yellow["700"],
          300: colors.yellow["800"],
        },

        secondary: {
          100: colors.green["300"],
          200: colors.green["400"],
          300: colors.green["500"],
        },

        info: {
          100: colors.sky["300"],
          200: colors.sky["400"],
          300: colors.sky["500"],
        },

        light: {
          100: colors.light["600"],
          200: colors.light["700"],
          300: colors.light["800"],
        },

        dark: {
          100: colors.dark["300"],
          200: colors.dark["400"],
          300: colors.dark["500"],
        },
      },
    },
  },
  plugins: [formsPlugin],
});
