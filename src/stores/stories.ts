import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Story } from "@/utils/types.ts";
import { getNewStories, getStory } from "@/utils/api.ts";

export const useStoriesStore = defineStore('stories', () => {
  const storiesId = ref<number[]>([]);
  const loadedStoriesAmount = ref(0);
  const stories = ref<Story[]>([]);

  const pullNewStories = async () => {
    storiesId.value = await getNewStories();
    const storiesToLoad = storiesId.value.splice(loadedStoriesAmount.value, loadedStoriesAmount.value + 20);
    const promises = storiesToLoad.map(id => getStory(id));

    stories.value = [...stories.value, ...await Promise.all(promises)];
  }

  return { stories, pullNewStories };
})
