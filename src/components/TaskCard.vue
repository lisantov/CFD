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
  <div class="task-card flex flex-col justify-center gap-2 w-full">
    <div class="flex flex-col justify-center">
      <div class="flex gap-2 items-end">
        <h3 class="task-title text-lg">{{ task.name }}</h3>
        <p :class="`task-deadline text-xs ${deadlineDate + 1 <= 3 ? deadlineDate + 1 < 1 ? 'danger' : 'warning' : ''}`">
          {{
            deadlineDate + 1 >= 0
              ? deadlineDate + 1 === 1
                ? `остался ${deadlineDate + 1}д`
                : `осталось ${deadlineDate + 1}д`
              : `просрочена на ${-(deadlineDate + 1)}д`
          }}
        </p>
      </div>
      <p class="task-description text-sm">{{ task.description }}</p>
    </div>
    <p class="task-date text-xs">{{ createdDate > 0 ? `${createdDate}д назад` : 'сегодня' }}</p>
    <ul class="flex gap-1 flex-wrap w-full">
      <li
        class="iconTag tag flex items-center gap-0.5"
        :style="{
          backgroundColor: `${task.size.color}4D`,
          boxShadow: `0 1px 10px ${task.size.color}4D`
        }"
      >
        <img class="icon" :src="task.size.iconUrl" :alt="task.size.name">
        <p class="tagText text-xs">{{ task.size.name }}</p>
      </li>
      <li
        class="roleTag tag flex items-center gap-0.5"
      >
        <p class="tagText text-xs">{{ task.role.name }}</p>
      </li>
      <li
          class="tag flex items-center gap-0.5"
        :style="{
          backgroundColor: `${task.priority.color}9D`,
          boxShadow: `0 1px 10px ${task.priority.color}6D`
        }"
      >
        <p class="tagText text-xs">{{ task.priority.name }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .task-card {
    position: relative;
    border: 1px solid #444;
    border-radius: 12px;
    padding: 4px 8px 8px;
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
    right: 12px;
    top: 4px;
    color: #999;
  }

  .task-deadline {
    color: #92a1ff;
    padding-bottom: 3px;
  }

  .task-deadline.warning {
    color: #ffdb96;
  }

  .task-deadline.danger {
    color: #ff5b59;
  }

  .tag {
    padding: 4px 6px;
    border-radius: 12px;
  }

  .roleTag {
    background-color: #484848;
    box-shadow: 0 0 10px #ffffff1d;
  }

  .iconTag {
    padding: 1px 6px 1px 0;
    max-height: 24px;
  }

  .tagText {
    color: #fff;
    opacity: 0.8;
  }

  .icon {
    width: 24px;
  }
</style>
