import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Story } from "@/utils/types.ts";
import { getComment, getStory } from '@/utils/api.ts'

export const useStoryStore = defineStore('story', () => {
  const storyId = ref<number>();
  const isLoading = ref<boolean>(false);
  const storyObject = ref<Story>();
  const comments = ref<Comment[]>();

  const pullStory = async () => {
    if (!isLoading.value) {
      isLoading.value = true;
      if (storyId.value) {
        storyObject.value = await getStory(storyId.value)
          .finally(() => {
            isLoading.value = false;
          });
      }
    }
  }

  const pullComments = async () => {
    if (storyObject.value && storyObject.value.kids) {
      comments.value = await Promise.all(storyObject.value.kids.map((c) => getComment(c)))
    }
  }

  const setStoryId = (id: number) => {
    storyId.value = id;
  }

  return { storyId, isLoading, storyObject, comments, pullStory, pullComments, setStoryId };
})
