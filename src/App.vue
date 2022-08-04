<template>
  <div class="p-10">
    <FFileInput
      v-model="value"
      url="is the same as string and the compiler aggressively reduces such."
    />
  </div>
</template>

<script setup lang="ts">
// import "../dist/style.css";
import { useHasFile } from "./composables/src/file";

const value = ref(null);
const hasFile = useHasFile(value,()=>"is the same as string and the compiler aggressively reduces such.")

// const headers: TableHeader[] = [
//   { key: "full_name", label: "Full Name" },
//   { key: "username", label: "Username" },
//   { key: "email", label: "Email" },
//   { key: "role_label", label: "Role" },
// ];



const handle = () => {
  console.log("hello world");
};
</script>

<style scoped></style>
