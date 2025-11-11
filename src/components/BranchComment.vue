<script setup lang="ts">
import type { Comment } from '@/utils/types.ts'
import { ref } from 'vue'
import { getComment } from '@/utils/api.ts'
import PreloaderComponent from '@/components/PreloaderComponent.vue'

const props = defineProps<{
  comment: Comment
  expand: boolean
  level: number
}>()
const hasNestedCommemts = props.comment.kids && props.comment.kids.length > 0
const isExpanded = ref<boolean>(props.expand)
const isNestedLoading = ref<boolean>(false)
const nestedComments = ref<Comment[]>()

const handleExpand = () => {
  isExpanded.value = !isExpanded.value;
  if (!nestedComments.value) {
    getNestedComments(props.comment.kids);
  }
}

const getNestedComments = async (ids: number[]) => {
  isNestedLoading.value = true
  const promises = ids.map(id => getComment(id));
  nestedComments.value = await Promise.all(promises)
    .then((d) => {
      isNestedLoading.value = false;
      return d;
    })
}
</script>

<template>
  <div
    v-if="!props.comment.dead"
    class="flex justify-start items-stretch rounded-2xl bg-blue-50 p-2"
    :style="props.level ? { paddingLeft: '10px', borderLeft: '2px solid #b4cfff' } : {}"
  >
    <div class="flex flex-col gap-6 w-full">
      <div class="flex flex-col justify-center gap-1">
        <h3 class="text-base opacity-50">{{ props.comment.by }}</h3>
        <p class="comment-content text-lg" v-html="props.comment.text"></p>
      </div>
      <p class="text-xs">{{ new Date(props.comment.time * 1000).toDateString() }}</p>
      <div class="flex flex-col justify-center gap-4 w-full" v-if="hasNestedCommemts">
        <button class="expand" @click="handleExpand">
          {{ isExpanded ? 'Свернуть комментарии' : 'Развернуть комментарии' }}
        </button>
        <div class="flex justify-center items-center w-full h-24" v-if="isNestedLoading" >
          <PreloaderComponent />
        </div>
        <ul v-else-if="isExpanded" class="flex flex-col gap-6">
          <li v-for="com in nestedComments" :key="com.id">
            <BranchComment v-if="!props.comment.dead" :comment="com" :expand="false" :level="props.level + 1" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comment-content {
  font-size: 18px;
}

.comment-content a {
  text-decoration: underline;
  color: cornflowerblue;
}

.expand {
  padding: 2px 12px;
  border: 1px solid cornflowerblue;
  border-radius: 12px;
  background-color: transparent;
  color: cornflowerblue;
  cursor: pointer;
  transition: 0.25s ease-in-out;
}

.expand:hover {
  background-color: cornflowerblue;
  color: #fff;
}
</style>
