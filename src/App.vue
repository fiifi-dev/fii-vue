<template>
  <div class="p-10">
    <FFileInput v-model="value" />
  </div>
</template>

<script setup lang="ts">
import '../dist/style.css';

// const headers: TableHeader[] = [
//   { key: "full_name", label: "Full Name" },
//   { key: "username", label: "Username" },
//   { key: "email", label: "Email" },
//   { key: "role_label", label: "Role" },
// ];

const value = ref(null);

const handle = () => {
  console.log("hello world");
};
</script>

<style scoped></style>
