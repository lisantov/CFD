<script setup lang="ts">
  import { useStoriesStore } from "@/stores/stories.ts";
  import {computed} from "vue";

  const store = useStoriesStore();
  const stories = computed(() => {
    return store.stories.slice(0, 20);
  })
</script>

<template>
  <ul>
    <li v-for="story in stories">
      {{ story.title }}
    </li>
  </ul>
</template>

<style scoped>

</style>
