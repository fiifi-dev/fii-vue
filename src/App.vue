<template>
  <div class="p-10">
    <FFileInput
      v-model="value"
      url=" is the same as string and the compiler aggressively reduces such unions to string. This is completely correct as far as type safety goes. But it's not great from the point of view of documentation or IntelliSense, as you've seen."
    />
  </div>
</template>

<script setup lang="ts">
import "../dist/style.css";

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
