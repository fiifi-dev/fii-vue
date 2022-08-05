<template>
  <div class="p-10">
    <button>{{ value }}</button>
    <FCheckbox v-model="value" label="Click Me" />
  </div>
</template>

<script setup lang="ts">
import "../dist/style.css";
import { useHasFile } from "./composables/src/file";

const value = ref(false);
const url = ref("hello world");
const hasFile = useHasFile(value, () => url.value);

// const headers: TableHeader[] = [
//   { key: "full_name", label: "Full Name" },
//   { key: "username", label: "Username" },
//   { key: "email", label: "Email" },
//   { key: "role_label", label: "Role" },
// ];

const handle = () => {
  url.value = "";
};
</script>

<style scoped></style>
