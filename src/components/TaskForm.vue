<script setup lang="ts">
import { useTaskFormStore } from '@/stores/TaskFormStore.ts'
import { ref } from 'vue'
import type { Task } from '@/utils/type.ts'
import { useTaskStore } from '@/stores/TaskStore.ts'
import { useModalStore } from '@/stores/ModalStore.ts'

interface TaskFormProps {
  boardTag: string;
}

const props = defineProps<TaskFormProps>();

const formStore = useTaskFormStore();
const taskStore = useTaskStore();

const formState = ref<Task>(Object.assign({
    ...formStore.currentTask,
    boardTag: props.boardTag,
  })
);

const handleSubmit = (e: Event) => {
  e.preventDefault();
  formState.value.id = taskStore.tasks.length;
  formState.value.createdAt = new Date();
  formState.value.updatedAt = new Date();

  taskStore.addTask(formState.value);
  formStore.resetForm();
}
</script>

<template>
  <form class="flex flex-col justify-center gap-8" @submit="handleSubmit">
    <div class="flex flex-col justify-center gap-2">
      <label class="flex flex-col gap-0.5 justify-center relative">
        <span>Имя задачи</span>
        <input class="input" v-model="formState.name" type="text">
      </label>
      <label class="flex flex-col gap-0.5 justify-center relative">
        <span>Описание задачи</span>
        <input class="input" v-model="formState.description" type="text">
      </label>
      <label class="flex flex-col gap-0.5 justify-center relative">
        <span>Дедлайн задачи</span>
        <input class="input" v-model="formState.deadlineAt" type="date">
      </label>
    </div>
    <button class="submit" type="submit">
      Создать
    </button>
  </form>
</template>

<style scoped>
  .input {
    min-height: 35px;
    border: 1px solid #444;
    border-radius: 12px;
    background-color: #171717;
    padding: 4px 12px;
    color: #fff;
    transition: 0.25s ease-in-out;
  }

  .input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(100%);
  }

  .input:hover {
    transform: translateY(-1px);
    box-shadow: 0 0 12px 0 #ffffff2d;
  }

  .submit {
    border: 1px solid #444;
    border-radius: 12px;
    background-color: #2d2d2d;
    padding: 6px 16px;
    cursor: pointer;
    transition: 0.25s ease-in-out;
  }

  .submit:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 12px 0 #00873a8d;
    background-color: #006528;
    border-color: #00873a;
  }
</style>
