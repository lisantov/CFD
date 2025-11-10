<script setup lang="ts">
  import { useStoriesStore } from "@/stores/stories.ts";
  import { computed, onMounted, onUnmounted, ref } from 'vue'
  import StoryCardComponent from "@/components/StoryCardComponent.vue";
  import PreloaderComponent from "@/components/PreloaderComponent.vue";

  const store = useStoriesStore();
</script>

<template>
  <div v-if="!store.isLoading && store.isInit"  class="stories">
    <ul class="grid grid-cols-2 gap-2 w-full">
      <li v-for="story in store.stories">
        <StoryCardComponent :story="story" />
      </li>
    </ul>
    <div class="stories__load-container">
      <button v-if="!store.isNewLoading" @click="store.loadMoreStories()" class="stories__load w-full border-amber-500">
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
    background-color: white;
    color: black;
    cursor: pointer;
    transition: 0.25s ease;
  }

  .stories__load:hover {
    background-color: #ffa200;
    color: white;
  }
</style>
