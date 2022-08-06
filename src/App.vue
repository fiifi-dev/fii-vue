<template>
  <FCarousel :images="images" content-class="flex items-center p-5">
    <template #key(one)="{ item }">
      <FCarouselSlide
        :title="item.title"
        :description="item.description"
        :actions="actions"
      />
    </template>

    <template #key(two)="{ item }">
      <FCarouselSlide
        :title="item.title"
        :description="item.description"
        :actions="actions"
      />
    </template>

    <template #key(three)="{ item }">
      <FCarouselSlide
        :title="item.title"
        :description="item.description"
        :actions="actions"
      />
    </template>
  </FCarousel>
</template>

<script setup lang="ts">
import "../dist/style.css";
import FCarousel from "@/components/media/FCarousel.vue";
import FCarouselSlide from "@/components/media/FCarouselSlide.vue";
import FBtn from "@/components/buttons/FBtn.vue";
import { SlideItem } from "./types/general";

const images = ref([
  {
    url: "https://images.unsplash.com/photo-1657299170935-31e068229885?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    key: "one",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, iste.",
  },
  {
    url: "https://images.unsplash.com/photo-1657299170222-1c67dc056b70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    key: "two",
    title:
      "Eos aliquam inventore odio temporibus eligendi repudiandae quia",
  },
  {
    url: "https://images.unsplash.com/photo-1657299142018-4f7f33aea18c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    key: "three",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  },
]);

const actions: SlideItem[] = [
  { key: "about_Us", label: "About Us", variant: "primary" },
  { key: "admissions", label: "Admissions", variant: "accent" },
];
</script>

<style scoped></style>
