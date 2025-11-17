<script setup lang="ts">
 import type { Task } from '@/utils/type.ts'
 import { computed } from 'vue'
 interface TaskCardProps {
   task: Task
 }

 const props = defineProps<TaskCardProps>();
 const createdDate = computed(() => {
   const difference = (Number(new Date()) - Number(props.task.createdAt));
   return Math.floor(difference / (1000 * 60 * 60 * 24))
 })

 const deadlineDate = computed(() => {
   const difference = (Number(new Date(props.task.deadlineAt)) - Number(new Date()));
   return Math.floor(difference / (1000 * 60 * 60 * 24))
 })
</script>

<template>
  <div class="task-card">
    <div class="flex flex-col justify-center">
      <h3 class="task-title text-lg">{{ task.name }}</h3>
      <p class="task-description text-sm">{{ task.description }}</p>
    </div>
    <p class="task-date text-xs">{{ createdDate > 0 ? `${createdDate}д назад` : 'сегодня' }}</p>
    <p class="task-deadline text-xs">{{ deadlineDate >= 0 ? `осталось ${deadlineDate}д` : `просрочена на ${deadlineDate}д`
      }}</p>
  </div>
</template>

<style scoped>
  .task-card {
    position: relative;
    border: 1px solid #444;
    border-radius: 12px;
    padding: 4px 10px;
    background: #2d2d2d;
  }

  .task-title {
    color: #eee;
  }

  .task-description {
    color: #999;
  }

  .task-date {
    position: absolute;
    right: 10px;
    top: 4px;
    color: #999;
  }

  .task-deadline {
    position: absolute;
    right: 10px;
    bottom: 4px;
    color: #ff5959;
  }
</style>
