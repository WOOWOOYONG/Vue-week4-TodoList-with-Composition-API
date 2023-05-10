import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getTodo } from '@/apis/api'
import { errorAlert } from '@/alert'
import { useConfigStore } from '@/stores/configStore'

export const useTodoStore = defineStore('todoStore', () => {
  const state = ref('all')
  const todos = ref([])
  const undoneNum = ref(0)
  const globalConfig = useConfigStore()

  const changeState = (val) => {
    state.value = val
  }

  const countUndone = () => {
    const undoneArr = todos.value.filter((item) => item.completed_at === null)
    undoneNum.value = undoneArr.length
  }

  const getTodoList = async () => {
    try {
      const res = await getTodo(globalConfig.config)
      todos.value = res.data.todos
      countUndone()
    } catch (err) {
      errorAlert(err.response.data.message)
    }
  }

  const setTodoByState = () => {
    switch (state.value) {
      case 'all':
        return todos.value
      case 'undone':
        return todos.value.filter((todo) => todo.completed_at === null)
      case 'done':
        return todos.value.filter((todo) => todo.completed_at !== null)
      default:
        return todos.value
    }
  }

  const filteredTodos = computed(() => {
    return setTodoByState()
  })

  return { state, changeState, todos, undoneNum, countUndone, getTodoList, filteredTodos }
})
