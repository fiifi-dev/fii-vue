import type { Component } from "vue";
import type { RouteLocationRaw } from "vue-router";

export type Variant =
  | "primary"
  | "secondary"
  | "danger"
  | "warning"
  | "success"
  | "info"
  | "light"
  | "dark"
  | "accent";

export type Size = "sm" | "md" | "lg";

export type SelectOption = { label: string; value: any };

export type TableHeader = {
  key: string;
  label: string;
};

export type Numeric = string | number;

export type Pagination = {
  limit: string | number;
  offset: string | number;
};

export type Tab = {
  key: string;
  label: string;
  to: RouteLocationRaw;
};

export type DropdownItem = {
  icon?: string | Component;
  label: string;
  key: string;
  to?: RouteLocationRaw;
};

export type MenuItem = {
  icon?: string | Component;
  label: string;
  key?: string;
  to: RouteLocationRaw;
};

export type AppBarItem = {
  label: string;
  to: RouteLocationRaw;
};

export type SlideItem = {
  key: string;
  label: string;
  variant: Variant;
};
