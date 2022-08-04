export type Toast = {
  message?: string;
  variant?: "success" | "danger" | "light" | "dark";
};

// key.ts
import type { EventBusKey } from "@vueuse/core";

export const toastKey: EventBusKey<Toast> = Symbol("toast");

export const confirmKey: EventBusKey<string> = Symbol("confirm");
export const confirmResolveKey: EventBusKey<boolean> = Symbol("confirm-resolve");
