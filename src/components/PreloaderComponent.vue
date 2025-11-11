<script setup lang="ts">

</script>

<template>
  <div class="grid grid-cols-2 grid-rows-2 gap-1.5 size-8">
    <div class="wobble size-3 rounded-full"></div>
    <div class="wobble size-3 rounded-full"></div>
    <div class="wobble size-3 rounded-full"></div>
    <div class="wobble size-3 rounded-full"></div>
  </div>
</template>

<style scoped>
  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }

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

  .grid {
    animation: rotate 3s infinite linear;
  }

  .wobble {
    background: cornflowerblue;
    animation: scaleWobble 1s infinite linear;
  }

  .wobble:nth-child(2) {
    background: #3975ea;
    animation-delay: 0.25s;
  }

  .wobble:nth-child(3) {
    background: #2153b8;
    animation-delay: 0.5s;
  }

  .wobble:nth-child(4) {
    background: #0d2f71;
    animation-delay: 0.75s;
  }
</style>
