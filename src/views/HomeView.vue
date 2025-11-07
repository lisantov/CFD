<script setup lang="ts">
  import { useStoriesStore } from "@/stores/stories.ts";
  import {computed} from "vue";
  import StoryCardComponent from "@/components/StoryCardComponent.vue";
  import PreloaderComponent from "@/components/PreloaderComponent.vue";

  const store = useStoriesStore();
  const stories = computed(() => {
    return store.stories.slice(0, 20);
  })
</script>

<template>
  <ul v-if="!store.isLoading" class="flex flex-col gap-6 w-full">
    <li v-for="story in stories">
      <StoryCardComponent :story="story" />
    </li>
  </ul>
  <PreloaderComponent v-else />
</template>

<style scoped>

</style>
