<script setup lang="ts">
  import type {Story} from "@/utils/types.ts";
  interface StoryCardComponentProps {
    story: Story
  }

  const props = defineProps<StoryCardComponentProps>();
</script>

<template>
  <div class="story flex flex-col justify-between w-full h-full border-amber-500">
    <div class="title">
      <a :href="props.story.url" target="_blank">
        <h2 class="text-2xl font-medium underline text-white">{{ props.story.title }}</h2>
      </a>
      <p class="story__author">by {{ props.story.by }}</p>
    </div>
    <div class="content flex flex-col justify-center gap-2">
      <div class="flex justify-between items-center">
        <p class="text-[0.75rem] font-normal">Комментарии: {{ props.story.descendants }}</p>
        <p class="text-[0.75rem] font-normal">Рейтинг: {{ props.story.score }}</p>
        <p class="text-[0.75rem] font-normal"> {{ new Date(props.story.time * 1000).toDateString() }}</p>
      </div>
      <div class="w-full bg-blue-100 h-0.5"></div>
      <div class="flex flex-col justify-center gap-4">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .story {
    height: min-content;
    border-radius: 12px;
    background-color: #fff;
  }

  .title {
    padding: 0.8rem;
    background-color: cornflowerblue;
    border-radius: 12px 12px 0 0;
  }

  .story__author {
    font-size: 0.8rem;
    opacity: 0.5;
  }

  .content {
    padding: 0.8rem;
  }
</style>
