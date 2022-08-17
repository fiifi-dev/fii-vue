<template>
  <div class="p-0 m-0">
    <FAppBar :items="menuItems" />

    <FCarousel :items="items" content-class="flex items-center p-5">
      <template #key(1)="{ item }">
        <FCarouselSlide
          :title="item.title"
          :description="item.description"
          :actions="actions"
        />
      </template>
      <template #key(2)="{ item }">
        <FCarouselSlide
          :title="item.title"
          :description="item.description"
          :actions="actions"
        />
      </template>
      <template #key(3)="{ item }">
        <FCarouselSlide
          :title="item.title"
          :description="item.description"
          :actions="actions"
        />
      </template>
    </FCarousel>

    <div class="m-0 p-0">Lorem ipsum dolor sit amet.</div>
  </div>
</template>

<script setup lang="ts">
import "../dist/style.css";
import FCarousel from "@/components/media/FCarousel.vue";
import FCarouselSlide from "@/components/media/FCarouselSlide.vue";
import FAppBar from "@/components/bars/FAppBar.vue";
import type { SlideItem, SlideItemAction } from "./types/general";



const items = ref<SlideItem[]>([
  {
    url: "https://loremflickr.com/3000/2700?lock=1",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, iste.",
  },
  {
    url: "https://loremflickr.com/3000/2700?lock=2",
    title: "Eos aliquam inventore odio temporibus eligendi repudiandae quia",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, iste.",
  },
  {
    url: "https://loremflickr.com/3000/2700?lock=3",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, iste.",
  },
]);

const actions:SlideItemAction[] = [
  { key: "about_Us", label: "About Us", variant: "primary" },
  { key: "admissions", label: "Admissions", variant: "accent" },
];

const menuItems = [
  { to: "home", label: "Home" },
  { to: "about", label: "About" },
];
</script>

<style scoped></style>
