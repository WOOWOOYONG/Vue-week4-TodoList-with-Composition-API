<script setup>
import TodoInput from './todos/TodoInput.vue'
import TodoStatusTab from './todos/TodoStatusTab.vue'
import TodoItems from './todos/TodoItems.vue'
import LogOutBtn from './LogOutBtn.vue'
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useConfigStore } from '@/stores/configStore'
import { useTodoStore } from '@/stores/todoStore'

const nickName = ref('')

const configStore = useConfigStore()
const todoStore = useTodoStore()

const { getConfig } = configStore
const { getTodoList } = todoStore
const { undoneNum, todos } = storeToRefs(todoStore)

onMounted(async () => {
  await getConfig()
  await getTodoList()
})

const getUserName = () => {
  nickName.value = localStorage.getItem('userNickname')
}

onMounted(() => {
  getUserName()
})
</script>

<template>
  <div class="mx-auto px-3 text-lg md:max-w-[80%] lg:max-w-[30%]">
    <h1 class="mb-10 text-xl">哈囉 {{ nickName }}～ 來做點事吧</h1>
    <TodoInput />
    <div v-if="todos.length === 0" class="mt-10">
      <h2 class="text-2xl">目前沒有待辦事項</h2>
    </div>
    <div v-else>
      <TodoStatusTab />
      <div class="mb-10"><TodoItems /></div>
      <div class="flex items-center justify-between border-t-2 pt-4">
        <p>目前還有{{ undoneNum }}件待完成</p>
      </div>
    </div>
    <LogOutBtn />
  </div>
</template>
