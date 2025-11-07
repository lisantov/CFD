import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Story } from "@/utils/types.ts";
import { getNewStories, getStory } from "@/utils/api.ts";

export const useStoriesStore = defineStore('stories', () => {
  const storiesId = ref<number[]>([]);
  const loadedStoriesAmount = ref(0);
  const stories = ref<Story[]>([]);
  const isLoading = ref(false);

  const pullNewStories = async () => {
    const actualStories = await getNewStories();
    console.log("START");

    if (storiesId.value.length === actualStories.length ) {
      const areSimilar = storiesId.value.every((element, index) =>
        element === actualStories[index]);
      if (areSimilar) {
        return;
      }
    }

    const storiesToLoad = actualStories.splice(loadedStoriesAmount.value, loadedStoriesAmount.value + 20);
    console.log(isLoading.value);
    isLoading.value = true;
    const promises = storiesToLoad.map(id => getStory(id));

    stories.value = [...stories.value, ...await Promise.all(promises).then((data) => {
      isLoading.value = false;
      return data;
    })];
  }

  return { stories, isLoading, pullNewStories };
})
