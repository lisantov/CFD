<script setup lang="ts">
  import { useStoriesStore } from "@/stores/stories.ts";
  import StoryCardComponent from "@/components/StoryCardComponent.vue";
  import PreloaderComponent from "@/components/PreloaderComponent.vue";

  const store = useStoriesStore();
</script>

<template>
  <div v-if="!store.isLoading && store.isInit"  class="stories">
    <ul class="grid grid-cols-2 gap-2 w-full">
      <li v-for="story in store.stories" :key="story.id">
        <StoryCardComponent :story="story" />
      </li>
    </ul>
    <div class="stories__load-container">
      <button v-if="!store.isNewLoading" @click="store.loadMoreStories()" class="stories__load w-full">
        Показать ещё
      </button>
      <PreloaderComponent v-else />
    </div>
  </div>
  <div v-else class="flex items-center justify-center w-full">
    <PreloaderComponent />
  </div>
</template>

<style scoped>
  .stories__load-container {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .stories__load {
    padding: 8px 16px;
    border-radius: 12px;
    border-width: 1px;
    border-style: solid;
    border-color: cornflowerblue;
    background-color: transparent;
    color: black;
    cursor: pointer;
    transition: 0.25s ease;
  }

  .stories__load:hover {
    background-color: cornflowerblue;
    color: white;
  }
</style>
