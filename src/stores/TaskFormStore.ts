import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Task } from '@/utils/type.ts'

export const useTaskFormStore = defineStore('taskForm', () => {
  const currentTask = ref<Partial<Task>>({
    id: 0,
    name: '',
    description: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    deadlineAt: new Date(),
    boardTag: '',
  });

  const setCurrentTaskField = (field: string) => (value: string) => {
    currentTask.value = Object.assign({
      ...currentTask.value,
      [field]: value
    });
  }

  const resetForm = () => {
    currentTask.value = {
      id: 0,
      name: '',
      description: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      deadlineAt: new Date(),
      boardTag: '',
    };
  }

  return { currentTask, setCurrentTaskField, resetForm };
})
