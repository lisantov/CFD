<script setup lang="ts">

</script>

<template>
  <div class="grid grid-cols-2 grid-rows-2 gap-1.5 size-8">
    <div class="wobble size-3 rounded-full bg-amber-500"></div>
    <div class="wobble size-3 rounded-full bg-amber-500"></div>
    <div class="wobble size-3 rounded-full bg-amber-500"></div>
    <div class="wobble size-3 rounded-full bg-amber-500"></div>
  </div>
</template>

<style scoped>
  @keyframes scaleWobble {
    0%, 100% {
      scale: 1;
    }
    25% {
      scale: 0.5;
    }
    75% {
      scale: 1.5;
    }
  }

  .wobble {
    animation: scaleWobble 1.5s infinite;
  }
</style>
