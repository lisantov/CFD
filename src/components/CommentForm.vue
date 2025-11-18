<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Task } from '@/utils/type.ts'
import { useTaskStore } from '@/stores/TaskStore.ts'

interface EditTaskFormProps {
  task: Task
}

const props = defineProps<EditTaskFormProps>()

const taskStore = useTaskStore()


const firstInput = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (firstInput.value) firstInput.value.focus()
})

const formState = ref<string>('');

const handleSubmit = (e: Event) => {
  e.preventDefault();
  taskStore.addComment(props.task.id, formState.value);
}
</script>

<template>
  <form class="flex flex-col justify-center gap-8" @submit="handleSubmit">
    <div class="flex flex-col justify-center gap-2">
      <label class="flex flex-col gap-0.5 justify-center relative">
        <span>Комментарий к задаче</span>
        <textarea ref="firstInput" class="textarea" v-model="formState" type="text" required placeholder="Почему задача отклонена"></textarea>
      </label>
    </div>
    <button class="submit" type="submit">Отправить</button>
  </form>
</template>

<style scoped>
.textarea {
  min-height: 35px;
  border: 1px solid #444;
  border-radius: 12px;
  background-color: #171717;
  padding: 4px 12px;
  color: #fff;
  transition: 0.25s ease-in-out;
}

.textarea:hover {
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
