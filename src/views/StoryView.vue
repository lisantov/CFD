<script setup lang="ts">
  import { useStoryStore } from '@/stores/story.ts'
  import StoryPostComponent from '@/components/StoryPostComponent.vue'
  import PreloaderComponent from '@/components/PreloaderComponent.vue'

  const props = defineProps<{id: number}>();
  const store = useStoryStore();

  store.setStoryId(props.id);
  store.pullStory()
    .then(() => {
      store.pullComments()
    });
</script>

<template>
  <div class="flex justify-center items-start w-full">
    <StoryPostComponent v-if="store.storyObject" :story="store.storyObject">

    </StoryPostComponent>
    <PreloaderComponent v-else-if="store.isLoading" />
    <p v-else>Ошибка</p>
  </div>
</template>

<style scoped>

</style>
