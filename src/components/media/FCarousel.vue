<template>
  <section class="w-full" aria-label="Newest Photos">
    <div class="carousel" data-carousel :style="{ minHeight: height }">
      <div class="action">
        <div class="indicators">
          <div
            v-for="item in items.length"
            :key="item"
            :data-active="item === selectedItem + 1"
            @click="selectedItem = item - 1"
          ></div>
        </div>

        <div class="carousel-button">
          <button
            class="prev"
            data-carousel-button="prev"
            @click="handleClick()"
          >
            <IFiiCaretLeft class="w-7 h-7" />
          </button>

          <button
            class="next"
            data-carousel-button="next"
            @click="handleClick(true)"
          >
            <IFiiCaretRight class="w-7 h-7" />
          </button>
        </div>
      </div>

      <ul data-slides>
        <li
          v-for="(item, index) in items"
          :key="index"
          class="slide"
          :data-active="selectedItem === index"
        >
          <img :src="item.url" :alt="`Image ${index}`" />

          <div class="content">
            <slot :name="`item(${index})`" :item="item" :index="index">
              <h1 class="text-2xl">Item {{ index }}</h1>
            </slot>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
import type { SlideItem } from "../../types/general";
import type { PropType, StyleValue } from "vue";

export default defineComponent({
  name: "FCarousel",

  props: {
    items: {
      type: Array as PropType<SlideItem[]>,
      required: false,
      default: () => [],
    },

    contentClass: {
      type: [String, Object] as PropType<StyleValue>,
      required: false,
      default: "",
    },

    height: {
      type: String,
      required: false,
      default: "100vh",
      validator: (value: string) => {
        const test = new RegExp("^\\d+(px|em|rem|vh|vw|%)$").test(value);
        if (!test)
          console.error("Must provide a valid size: eg. 100em,4px etc");
        return test;
      },
    },
  },

  setup(props) {
    const selectedItem = ref(0);
    let interval = ref();

    const handleClick = (isNext?: boolean) => {
      const offset = isNext ? 1 : -1;
      let newIndex = selectedItem.value + offset;

      if (newIndex >= props.items.length) newIndex = 0;
      else if (newIndex < 0) newIndex = props.items.length - 1;

      selectedItem.value = newIndex;
    };

    onMounted(() => {
      interval.value = setInterval(() => handleClick(true), 5000);
    });

    onBeforeUnmount(() => {
      clearInterval(interval.value);
    });
    return { selectedItem, handleClick };
  },
});
</script>

<style scoped>
*,
*::before,
*::after {
  @apply box-border;
}

body {
  margin: 0;
}

.carousel {
  @apply relative;
}

.carousel > ul {
  @apply m-0 p-0 list-none;
}

.carousel .slide {
  @apply absolute inset-0 opacity-0;
  @apply transition-opacity duration-1000 ease-in-out delay-1000;
}

.carousel .slide > img {
  @apply block h-full w-full object-cover object-center absolute;
}
.carousel .slide > .content {
  @apply block h-full w-full z-1 absolute;
  @apply after:(content-[''] block bg-black/30 absolute inset-0 -z-5);
}

.carousel .slide[data-active="true"] {
  @apply opacity-100 z-1 delay-0;
}

.carousel .action {
  @apply absolute z-5 bottom-4 left-4 right-4;
  @apply flex justify-between items-center;
}

.carousel-button {
  @apply flex flex-nowrap gap-4;
}
.carousel .carousel-button > button {
  @apply bg-black/30 cursor-pointer p-1 rounded-sm text-gray-100;
  @apply flex items-center justify-center;
  @apply hover:(bg-black/40 text-gray-100);
  @apply focus:(border-gray-700);
}
.carousel .indicators {
  @apply flex flex-nowrap gap-3;
}

.carousel .indicators > div {
  @apply h-1 w-12  bg-black/25 shadow rounded-sm transition-colors;
  @apply hover:cursor-pointer hidden sm:block;
}

.carousel .indicators > div[data-active="true"] {
  @apply bg-black/50;
}
</style>
