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
    refreshIds();
  }

  const moveTask = (id: number, newTag: string) => {
    tasks.value = tasks.value.map((task) => {
      if (task.id === id) task.boardTag = newTag;
      return task;
    });
  }

  const updateTask = (task: Task) => {
    tasks.value = tasks.value.map((t) => {
      if (task.id === t.id) return task;
      return t;
    })
  }

  const refreshIds = () => {
    tasks.value = tasks.value.map((t, i) => {
      t.id = i;
      return t;
    })
  }

  const addComment = (id: number, comment: string) => {
    tasks.value = tasks.value.map(t => {
      if (t.id === id) t.comment = comment;
      return t;
    })
  }

  return { tasks, addTask, removeTask, moveTask, updateTask, addComment };
})
