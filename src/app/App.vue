<script setup lang="ts">
  import { useStoriesStore } from "@/stores/stories.ts";

  const store = useStoriesStore();

  store.pullNewStories();
  setTimeout(() => {
    store.pullNewStories();
  }, 60000);
</script>

<template>
  <div class="flex flex-col items-center justify-items-start gap-16 w-full p-12 max-w-5xl">
    <h1 class="text-6xl text-amber-500">Lucker news</h1>
    <main class="flex items-center justify-items-center w-full">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
</style>
