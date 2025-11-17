<script setup lang="ts">
  import type { Task } from '@/utils/type.ts'
  import { computed } from 'vue'
  import { useTaskStore } from '@/stores/TaskStore.ts'
  import { useModalStore } from '@/stores/ModalStore.ts'
  import TaskForm from '@/components/TaskForm.vue'
  import TaskCard from '@/components/TaskCard.vue'

  interface TaskBoardProps {
    title: string;
    description: string;
    boardTag: string;
    canAdd?: boolean;
  }

  const props = defineProps<TaskBoardProps>();
  const taskStore = useTaskStore();
  const modalStore = useModalStore();
  const tasks = computed(() => taskStore.tasks.filter((t: Task) => t.boardTag === props.boardTag));

  const handleAddTask = () => {
    modalStore.openModal(TaskForm, { boardTag: props.boardTag });
  }
</script>

<template>
  <article class="board flex flex-col justify-between gap-4">
    <div class="flex flex-col justify-center items-center gap-0.5">
      <div class="flex justify-center items-center gap-1">
        <h2 class="board-title text-white text-xl">{{ title }}</h2>
        <span class="board-counter flex justify-center items-center text-xs">{{ tasks.length }}</span>
      </div>
      <p class="board-description text-sm">{{ description }}</p>
    </div>
    <ul class="w-full h-full overflow-auto flex flex-col gap-0.5">
      <li v-for="task in tasks" :key="task.id">
        <task-card :task="task" />
      </li>
    </ul>
    <button @click="handleAddTask" class="board-add" v-if="canAdd">
      <span class="board-add-icon"></span>
      Добавить задачу
    </button>
  </article >
</template>

<style scoped>
  .board {
    background-color: #171717;
    border-radius: 12px;
    border: 1px solid #222;
    padding: 16px;
  }

  .board-counter {
    width: 20px;
    aspect-ratio: 1;
    border-radius: 100%;
    background-color: #333;
    color: #aaa;
  }

  .board-description {
    color: #999;
  }

  .board-add {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    color: #999;
    cursor: pointer;
    transition: 0.25s ease-in-out;
  }

  .board-add:hover {
    color: #c6c6c6;
    transform: translateY(-2px);
  }

  .board-add:hover .board-add-icon::before,
  .board-add:hover .board-add-icon::after {
    background-color: #c6c6c6;
  }

  .board-add-icon {
    position: relative;
    width: 12px;
    aspect-ratio: 1;
  }

  .board-add-icon::before {
    content: "";
    position: absolute;
    top: 1px;
    left: 0;
    height: 100%;
    width: 1px;
    background: #999;
    transition: 0.25s ease-in-out;
  }

  .board-add-icon::after {
    content: "";
    position: absolute;
    top: 1px;
    left: 0;
    height: 100%;
    width: 1px;
    rotate: 90deg;
    background: #999;
    transition: 0.25s ease-in-out;
  }
</style>
