<script setup lang="ts">
import { useTaskFormStore } from '@/stores/TaskFormStore.ts'

interface TaskFormProps {
  boardTag: string;
}

const props = defineProps<TaskFormProps>();
const formStore = useTaskFormStore();
</script>

<template>
  <form>

  </form>
</template>

<style scoped>

</style>
