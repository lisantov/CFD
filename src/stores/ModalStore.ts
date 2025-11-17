import { type Component, ref } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const isVisible = ref<boolean>(false);
  const modalComponent = ref<Component | null>(null);
  const modalProps = ref<Record<string, unknown>>({});

  const openModal = (component?: Component, props: Record<string, unknown> = {}) => {
    if (component) {
      modalComponent.value = component;
      modalProps.value = props;
    }
    isVisible.value = true;
  };

  const closeModal = () => {
    isVisible.value = false;
    modalComponent.value = null;
    modalProps.value = {};
  };

  return { isVisible, modalComponent, modalProps, openModal, closeModal };
})
