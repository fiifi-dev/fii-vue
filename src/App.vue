<template>
  <div class="p-10">
    <button @click="handle">{{ hasFile }}</button>
    <FFileInput
      v-model="value"
      url="is the same as string and the compiler aggressively reduces such."
    />
  </div>
</template>

<script setup lang="ts">
import "../dist/style.css";
import { useHasFile } from "./composables/src/file";

const value = ref(null);
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
