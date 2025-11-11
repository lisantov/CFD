<script setup lang="ts">
import type { Comment } from '@/utils/types.ts'
import BranchComment from '@/components/BranchComment.vue'

const props = defineProps<{ comments: Comment[] }>();
</script>

<template>
  <ul class="flex flex-col gap-4">
    <li v-for="com in props.comments" :key="com.id">
      <BranchComment :comment="com" :expand="false" :level="0" />
    </li>
  </ul>
</template>

<style scoped></style>
