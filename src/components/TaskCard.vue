<script setup lang="ts">
 import type { Task } from '@/utils/type.ts'
 interface TaskCardProps {
   task: Task
 }

 const props = defineProps<TaskCardProps>();
</script>

<template>
  <div class="task-card">
    <h3 class="text">{{ task.name }}</h3>
    <p>{{ task.description }}</p>
    <p>{{ task.createdAt.toDateString() }}</p>
  </div>
</template>

<style scoped>
  .task-card {
    border: 1px solid #444;
    border-radius: 12px;
    padding: 12px;
    background: #2d2d2d;
  }
</style>
