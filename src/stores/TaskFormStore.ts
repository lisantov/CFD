import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Task } from '@/utils/type.ts'

export const useTaskFormStore = defineStore('taskForm', () => {
  const currentTask = ref<Task>();

  const setCurrentTaskField = (field: string) => (value: string) => {
    currentTask.value = Object.assign({
      ...currentTask.value,
      [field]: value
    });
  }

  return { currentTask, setCurrentTaskField };
})
