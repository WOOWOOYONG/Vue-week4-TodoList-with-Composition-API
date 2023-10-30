<script setup>
import { ref } from 'vue'
import { addTodo } from '../../apis/api'
import { addTodoSuccess, errorAlert, checkInputAlert } from '../../alert'
import { useConfigStore } from '@/stores/configStore'
import { useTodoStore } from '@/stores/todoStore'
import { storeToRefs } from 'pinia'

const configStore = useConfigStore()
const todoStore = useTodoStore()
const newTodo = ref('')

const { config } = storeToRefs(configStore)
const { getTodoList } = todoStore

const addTodoList = async () => {
  try {
    const newTodoInput = {
      todo: {
        content: newTodo.value
      }
    }
    const res = await addTodo(newTodoInput, config.value)
    if (res.status === 201) {
      addTodoSuccess()
      getTodoList()
      newTodo.value = ''
    }
  } catch (err) {
    errorAlert(err.response.data.message)
  }
}

const handleAddTodo = () => {
  if (newTodo.value && config.value) {
    addTodoList()
  } else {
    checkInputAlert()
  }
}
</script>

<template>
  <div class="mb-5 flex justify-between">
    <label for="todoInput" class="block w-[70%]">
      <input
        type="text"
        class="mr-5 w-full rounded-md border-2 px-2 py-1 indent-2"
        placeholder="請輸入待辦事項"
        v-model.trim="newTodo"
        @keypress.enter="handleAddTodo"
      />
    </label>
    <button
      type="button"
      class="w-[25%] rounded-md border border-slate-700 px-2 py-1 hover:bg-gray-900 hover:text-white"
      @click="handleAddTodo"
    >
      加入
    </button>
  </div>
</template>
