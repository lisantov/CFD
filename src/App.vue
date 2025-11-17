<script setup lang="ts">
import TaskBoard from '@/components/TaskBoard.vue'
import ModalWidget from '@/components/ModalWidget.vue'
import { useModalStore } from '@/stores/ModalStore.ts'

const modalStore = useModalStore();
</script>

<template>
  <header class="header w-full">
    <h1 class="title text-3xl">Extra Canban</h1>
  </header>

  <main class="main grid gap-6 min-w-max">
    <task-board title="Запланированные задачи" description="Надо выполнить до дедлайна" board-tag="todo" can-add />
    <task-board title="Задачи в работе" description="В процессе выполнения" board-tag="process" />
    <task-board title="Тестирование" description="Проходит проверку на корректность работы" board-tag="test" />
    <task-board title="Выполненные задачи" description="Успешно завершённые задачи" board-tag="done" />
  </main>

  <modal-widget v-if="modalStore.isVisible" :visible="modalStore.isVisible">
    {{ modalStore.modalContent }}
  </modal-widget>
</template>

<style scoped>
  .header {
    position: fixed;
    left: 0;
    top: 0;
    padding: 12px 80px;
    background-color: #1a1a1a;
  }

  .title {
    font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji";
    color: #fff;
  }

  .main {
    grid-template-columns: repeat(4, minmax(400px, 1fr));
    padding: 120px 80px 40px;
    min-height: 95vh;
  }
</style>
