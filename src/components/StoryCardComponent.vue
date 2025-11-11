<script setup lang="ts">
  import type {Story} from "@/utils/types.ts";
  interface StoryCardComponentProps {
    story: Story
  }

  const props = defineProps<StoryCardComponentProps>();
  const pageLink = `/${props.story.id}`;
</script>

<template>
  <div class="story flex flex-col justify-between gap-6 w-full h-full">
    <div>
      <a :href="props.story.url" target="_blank">
        <h2 class="text-1xl font-medium underline">{{ props.story.title }}</h2>
      </a>
      <p class="story__author">by {{ props.story.by }}</p>
    </div>
    <div class="flex justify-between items-center">
      <p class="text-[0.75rem] font-normal">Комментарии: {{ props.story.descendants }}</p>
      <RouterLink :to="pageLink" class="link text-[0.75rem] font-normal text-amber-500">Посмотреть комментарии</RouterLink>
    </div>
  </div>
</template>

<style scoped>
  .story {
    padding: 1rem;
    border-radius: 12px;
    border-width: 1px;
    border-style: solid;
    border-color: cornflowerblue;
    transition: 0.3s ease;
  }

  .story:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px 0 #0d2f714D;
    background-color: cornflowerblue;
    color: white;
  }

  .story:hover .link {
    color: white;
  }

  .story:hover .link:hover::before {
    background-color: white;
  }

  .story__author {
    font-size: 0.8rem;
    opacity: 0.5;
  }

  .link {
    position: relative;
    color: #2f599a;
    transition: 0.3s ease-in-out;
  }

  .link::before {
    content: "";
    position: absolute;
    top: 100%;
    width: 0;
    height: 1px;
    background: #2f599a;
    transition: 0.3s ease-in-out;
  }

  .link:hover {
    transform: translateY(-2px);
    color: #2f599a;
  }

  .link:hover::before {
    width: 100%;
    background: #2f599a;
  }
</style>
