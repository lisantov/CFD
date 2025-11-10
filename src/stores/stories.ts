import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Story } from "@/utils/types.ts";
import { getNewStories, getStory } from "@/utils/api.ts";

export const useStoriesStore = defineStore('stories', () => {
  const storiesId = ref<number[]>([]);
  const loadedStoriesAmount = ref(0);
  const stories = ref<Story[]>([]);
  const isLoading = ref(false);
  const isNewLoading = ref(false);
  const isInit = ref(false);

  const actualizeStories = async () => {
    const actualStories = await getNewStories();
    const areSimilar = storiesId.value.every((element, index) =>
      element === actualStories[index]);

    if (areSimilar) {
      return;
    }
    else {
      const storiesToLoad = actualStories.splice(0, loadedStoriesAmount.value + 1);
      const promises = storiesToLoad.map(id => getStory(id));

      stories.value = [...stories.value, ...await Promise.all(promises).then((data) => {
        if (!isInit.value) isInit.value = true;
        return data;
      })];
    }
  }

  const pullNewStories = async () => {
    const actualStories = await getNewStories();

    const storiesToLoad = actualStories.splice(loadedStoriesAmount.value, loadedStoriesAmount.value + 20);
    loadedStoriesAmount .value += 20;
    const promises = storiesToLoad.map(id => getStory(id));

    stories.value = [...stories.value, ...await Promise.all(promises)];
  }

  const initStories = async () => {
    isLoading.value = true;
    await pullNewStories().then(() => {
      isInit.value = true;
      isLoading.value = false;
    })
  }

  const loadMoreStories = async () => {
    isNewLoading.value = true;
    await pullNewStories().then(() => isNewLoading.value = false);
  }

  return { stories, isLoading, isNewLoading, isInit, actualizeStories, loadMoreStories, initStories };
})
