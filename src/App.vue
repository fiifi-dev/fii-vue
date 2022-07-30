<template>
  <FAdminLayout>
    <FDataTable :headers="headers" show-border @create="handle()" />
  </FAdminLayout>
</template>

<script setup lang="ts">
import FTestMenu from "./components/menu/FDropdown.vue";
import { DropdownItem, TableHeader } from "./types";

const headers: TableHeader[] = [
  { key: "full_name", label: "Full Name" },
  { key: "username", label: "Username" },
  { key: "email", label: "Email" },
  { key: "role_label", label: "Role" },
];

const handle = () => {
  console.log("hello world");
};
</script>

<style scoped></style>
