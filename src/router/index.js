import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import TodoView from '../views/TodoView.vue'
import { loginFirst } from '../alert'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'MyTodoList-首頁'
    }
  },
  {
    path: '/todo',
    name: 'todo',
    component: TodoView,
    meta: {
      title: 'MyTodoList-待辦事項',
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('userToken')
    if (!token) {
      loginFirst()
      return { name: 'home' }
    }
  }
})

router.beforeEach((to) => {
  window.document.title = to.meta.title
})

export default router
