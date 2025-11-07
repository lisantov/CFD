<script setup lang="ts">
  import type {Story} from "@/utils/types.ts";
  interface StoryCardComponentProps {
    story: Story
  }

  const props = defineProps<StoryCardComponentProps>();
</script>

<template>
  <div class="flex flex-col justify-between w-full">
    <div>
      <h2>{{ props.story.title }}</h2>
      <p>by {{ props.story.by }}</p>
    </div>
    <p>Комментарии: {{ props.story.descendants }}</p>
  </div>
</template>

<style scoped>

</style>
