import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Task } from '@/utils/type.ts'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([]);

  const addTask = (task: Task) => {
    tasks.value.push(task);
  }

  const removeTask = (id: number) => {
    tasks.value = tasks.value.filter((task) => task.id !== id);
  }

  const moveTask = (id: number, newTag: string) => {
    tasks.value = tasks.value.map((task) => {
      if (task.id !== id) task.boardTag = newTag;
      return task;
    });
  }

  return { tasks, addTask, removeTask, moveTask };
})
