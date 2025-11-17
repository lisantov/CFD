import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const isVisible = ref<boolean>(false);
  const modalContent = ref<HTMLElement | null>(null);

  const openModal = () => isVisible.value = true;
  const closeModal = () => isVisible.value = false;

  return { isVisible, modalContent, openModal, closeModal };
})
