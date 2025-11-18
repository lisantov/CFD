import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { SizeTag } from '@/utils/type.ts'

export const useSizeTagsStore = defineStore('sizeTags', () => {
  const tags = ref<SizeTag[]>([
    {
      id: 0,
      name: 'Маленькая',
      color: '#3251ff',
      iconUrl: '/icons/Easy.webp'
    },
    {
      id: 1,
      name: 'Средняя',
      color: '#ffa200',
      iconUrl: '/icons/Hard.webp'
    },
    {
      id: 2,
      name: 'Большая',
      color: '#ca46ff',
      iconUrl: '/icons/Insane.webp'
    },
  ]);

  return { tags };
})
