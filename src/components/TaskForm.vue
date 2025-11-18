<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { Task } from '@/utils/type.ts'
import { useTaskStore } from '@/stores/TaskStore.ts'
import { useSizeTagsStore } from '@/stores/SizeTagsStore.ts'
import { useRolesStore } from '@/stores/RolesStore.ts'
import { usePriorityTagsStore } from '@/stores/PriorityTagsStore.ts'
import { validateField, type ValidationResult } from '@/utils/validation.ts'

interface TaskFormProps {
  boardTag: string
}

const props = defineProps<TaskFormProps>()

const taskStore = useTaskStore()

const sizeTagsStore = useSizeTagsStore()
const rolesStore = useRolesStore()
const priorityTagsStore = usePriorityTagsStore()

const firstInput = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (firstInput.value) firstInput.value.focus()
})

const formState = ref<Task>(
  Object.assign({
    boardTag: props.boardTag,
    size: sizeTagsStore.tags[0],
    priority: priorityTagsStore.tags[0],
    role: rolesStore.roles[0],
  }),
)

const handleSubmit = (e: Event) => {
  e.preventDefault();
  formState.value.id = taskStore.tasks.length;
  formState.value.createdAt = new Date();
  formState.value.updatedAt = new Date();

  taskStore.addTask(formState.value);
}
</script>

<template>
  <form class="flex flex-col justify-center gap-8" @submit="handleSubmit">
    <div class="flex flex-col justify-center gap-2">
      <label class="flex flex-col gap-0.5 justify-center relative">
        <span>Имя задачи</span>
        <input
          ref="firstInput"
          class="input"
          v-model="formState.name"
          @input="handleChange"
          type="text"
          required
        />
      </label>

      <label class="flex flex-col gap-0.5 justify-center relative">
        <span>Описание задачи</span>
        <input
          class="input"
          v-model="formState.description"
          @input="handleChange"
          type="text"
          required
        />
      </label>

      <label class="flex flex-col gap-0.5 justify-center relative">
        <span>Дедлайн задачи</span>
        <input
          class="input"
          v-model="formState.deadlineAt"
          @input="handleChange"
          type="date"
          required
        />
      </label>

      <label class="flex flex-col gap-0.5 justify-center relative">
        <span>Объём задачи</span>
        <select name="size" class="select" v-model="formState.size" required>
          <option v-for="size in sizeTagsStore.tags" :key="size.id" :value="size">
            {{ size.name }}
          </option>
        </select>
      </label>

      <label class="flex flex-col gap-0.5 justify-center relative">
        <span>Приоритет задачи</span>
        <select name="priority" class="select" v-model="formState.priority" required>
          <option v-for="priority in priorityTagsStore.tags" :key="priority.id" :value="priority">
            {{ priority.name }}
          </option>
        </select>
      </label>

      <label class="flex flex-col gap-0.5 justify-center relative">
        <span>На какую роль задача</span>
        <select name="role" class="select" v-model="formState.role" required>
          <option v-for="role in rolesStore.roles" :key="role.id" :value="role">
            {{ role.name }}
          </option>
        </select>
      </label>
    </div>
    <button class="submit" type="submit">Создать</button>
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

.input[type='date']::-webkit-calendar-picker-indicator {
  filter: invert(100%);
}

.input:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 12px 0 #ffffff2d;
}

.select {
  min-height: 35px;
  border: 1px solid #444;
  border-radius: 12px;
  background-color: #171717;
  padding: 4px 12px;
  color: #fff;
  cursor: pointer;
  transition: 0.25s ease-in-out;
}

.select:hover {
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
