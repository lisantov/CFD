import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Task } from '@/utils/type.ts'

export const useDNDStore = defineStore('dnd', () => {
  const draggableTask = ref<Task | null>(null);
  const lastDragged = ref<Task | null>(null);

  const startDrag = (task: Task) => {
    draggableTask.value = task;
    lastDragged.value = draggableTask.value;
  }
  const endDrag = () => draggableTask.value = null;

  return { draggableTask, lastDragged, startDrag, endDrag };
})
