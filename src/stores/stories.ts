import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type {Story} from "@/utils/types.ts";

export const useStoriesStore = defineStore('stories', () => {
  const stories = ref<Story[]>();

  return { stories }
})
