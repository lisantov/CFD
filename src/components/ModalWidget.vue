<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

interface ModalWidgetProps {
  visible?: boolean
}

const props = defineProps<ModalWidgetProps>()
const modalRef = ref<HTMLDivElement | null>(null)
const isVisible = ref(props.visible)

const closeModal = () => {
  if (modalRef.value) {
    modalRef.value.classList.add('out');
  }
  setTimeout(() => {
    isVisible.value = false
    if (modalRef.value) modalRef.value.classList.remove('out')
  }, 300)
}

const handleKeyClose = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeModal()
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyClose)
})
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyClose)
})
</script>

<template>
  <div
    v-if="isVisible"
    ref="modalRef"
    class="modal-overlay flex justify-center items-center"
    @click.self="closeModal"
  >
    <div class="modal-content">
      <slot></slot>
      <button class="modal-close flex justify-center items-center" @click="closeModal"></button>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0px);
  }
  to {
    opacity: 0;
    transform: translateY(-12px);
  }
}

@keyframes overlayFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes overlayFadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: #00000088;
  z-index: 1000;
  animation: overlayFadeIn 0.3s ease-in-out 1;
}

.modal-overlay.out {
  animation: overlayFadeOut 0.3s ease-in-out 1;
}

.modal-overlay.out .modal-content {
  animation: fadeOut 0.3s ease-in-out 1;
}

.modal-content {
  position: relative;
  background: #121212;
  border: 1px solid #242424;
  color: #fff;
  padding: 2rem;
  border-radius: 12px;
  min-width: 300px;
  animation: fadeIn 0.3s ease-in-out 1;
}

.modal-close {
  position: absolute;
  padding: 8px;
  border-radius: 8px;
  width: 24px;
  aspect-ratio: 1;
  right: 8px;
  top: 8px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.modal-close:hover {
  background-color: #ffffff1d;
}

.modal-close::before,
.modal-close::after {
  content: '';
  left: 5px;
  top: 12px;
  position: absolute;
  background: #aaa;
  width: 14px;
  height: 2px;
  border-radius: 4px;
  rotate: 45deg;
}

.modal-close::before {
  rotate: 130deg;
}
</style>
