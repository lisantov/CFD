import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { PriorityTag } from '@/utils/type.ts'

export const usePriorityTagsStore = defineStore('priorityTags', () => {
  const tags = ref<PriorityTag[]>([
    {
      id: 0,
      name: 'Высокий',
      color: '#ff2929',
      priority: 3
    },
    {
      id: 1,
      name: 'Средний',
      color: '#ffa200',
      priority: 2
    },
    {
      id: 2,
      name: 'Низкий',
      color: '#3251ff',
      priority: 1
    },
  ]);

  return { tags };
})
