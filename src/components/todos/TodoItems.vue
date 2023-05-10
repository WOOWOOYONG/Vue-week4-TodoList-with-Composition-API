<script setup>
import { useConfigStore } from '@/stores/configStore'
import { useTodoStore } from '@/stores/todoStore'
import { toggleTodo, delTodo } from '../../apis/api'
import { togTodoSuccess, errorAlert, delTodoSuccess } from '../../alert'
import { storeToRefs } from 'pinia'

const configStore = useConfigStore()
const todoStore = useTodoStore()

const { config } = storeToRefs(configStore)
const { filteredTodos } = storeToRefs(todoStore)
const { getTodoList, countUndone } = todoStore

const handleToggleTodo = async (e) => {
  const todoId = e.target.dataset.id
  try {
    const res = await toggleTodo(todoId, config.value)
    if (res.status === 200) {
      togTodoSuccess()
      getTodoList()
      countUndone()
    }
  } catch (err) {
    errorAlert(err.response.data.message)
  }
}

const handleDelTodo = async (e) => {
  const todoId = e.target.dataset.id
  if (!todoId) {
    return
  }
  try {
    const res = await delTodo(todoId, config.value)
    if (res.status === 200) {
      delTodoSuccess()
      getTodoList()
    }
  } catch (err) {
    errorAlert(err.response.data.message)
  }
}
</script>

<template>
  <ul>
    <li v-for="todo in filteredTodos" :key="todo.id" class="mb-3 flex items-center">
      <input
        type="checkbox"
        id="todoItem"
        class="mr-10 h-5 w-5 cursor-pointer"
        :data-id="todo.id"
        :checked="todo.completed_at === null ? false : true"
        @click="handleToggleTodo"
      />
      <p
        :class="todo.completed_at === null ? '' : 'line-through'"
        class="w-full cursor-pointer border-b-2 border-transparent text-xl hover:border-gray-400"
        :data-id="todo.id"
        @click="handleToggleTodo"
      >
        {{ todo.content }}
      </p>

      <button :data-id="todo.id" @click="handleDelTodo">
        <i
          class="ri-close-line ri-xl cursor-pointer hover:scale-110 hover:text-red-400"
          :data-id="todo.id"
        ></i>
      </button>
    </li>
  </ul>
</template>
