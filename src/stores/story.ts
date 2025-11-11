import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Comment, Story } from '@/utils/types.ts'
import { getComment, getStory } from '@/utils/api.ts'

export const useStoryStore = defineStore('story', () => {
  const storyId = ref<number>();
  const isLoading = ref<boolean>(false);
  const isCommentsLoading = ref<boolean>(false);
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

  const clearStore = () => {
    storyId.value = undefined;
    isLoading.value = false;
    isCommentsLoading.value = false;
    storyObject.value = undefined;
    comments.value = undefined;
  }

  const pullComments = async () => {
    if (!isLoading.value) {
      isCommentsLoading.value = true;
      if (storyObject.value && storyObject.value.kids) {
        comments.value = await Promise.all(storyObject.value.kids.map((c) => getComment(c)))
          .finally(() => {
            isCommentsLoading.value = false;
          })
      }
      else {
        isCommentsLoading.value = false;
      }
    }
  }

  const setStoryId = (id: number) => {
    storyId.value = id;
  }

  return { storyId, isLoading, isCommentsLoading, storyObject, comments, pullStory, pullComments, setStoryId, clearStore };
})
