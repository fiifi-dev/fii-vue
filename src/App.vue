<template>
  <div class="">
    <FTestMenu :items="items">Click Me</FTestMenu>
  </div>
</template>

<script setup lang="ts">
import FTestMenu from "./components/menu/FDropdown.vue";
import { DropdownItem } from "./types";

const items: DropdownItem[] = [
  { key: "create", label: "Create" },
  { key: "update", label: "Update" },
];
</script>

<style scoped></style>
