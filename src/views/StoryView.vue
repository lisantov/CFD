<script setup lang="ts">
  import { useStoryStore } from '@/stores/story.ts'
  import StoryPostComponent from '@/components/StoryPostComponent.vue'
  import PreloaderComponent from '@/components/PreloaderComponent.vue'
  import CommentsComponent from '@/components/CommentsComponent.vue'

  const props = defineProps<{id: number}>();
  const store = useStoryStore();

  store.clearStore();

  store.setStoryId(props.id);
  store.pullStory()
    .then(() => {
      store.pullComments()
    });
</script>

<template>
  <div class="flex flex-col justify-start items-center w-full gap-4">
    <RouterLink to="/" class="link text-lg">&#9668; На главную</RouterLink>
    <StoryPostComponent v-if="store.storyObject" :story="store.storyObject">
      <div v-if="!store.comments && store.isCommentsLoading" class="flex justify-center items-center w-full h-24">
        <PreloaderComponent />
      </div>
      <CommentsComponent v-else-if="store.comments" :comments="store.comments" />
    </StoryPostComponent>
    <PreloaderComponent v-else-if="store.isLoading" />
    <p v-else>Ошибка</p>
  </div>
</template>

<style scoped>
.link {
  position: relative;
  color: cornflowerblue;
  transition: 0.3s ease-in-out;
  align-self: flex-start;
}

.link::before {
  content: "";
  position: absolute;
  top: 100%;
  width: 0;
  height: 1px;
  background: cornflowerblue;
  transition: 0.3s ease-in-out;
}

.link:hover {
  transform: translateY(-2px);
  color: #2f599a;
}

.link:hover::before {
  width: 100%;
  background-color: #2f599a;
}
</style>
