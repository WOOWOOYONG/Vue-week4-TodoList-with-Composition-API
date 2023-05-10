<script setup>
import { useTodoStore } from '../../stores/todoStore'
import { storeToRefs } from 'pinia'

const todoStore = useTodoStore()

const { state } = storeToRefs(todoStore)
const { changeState } = todoStore
</script>

<template>
  <ul class="mb-6 flex justify-center gap-5 rounded border-2 border-slate-200">
    <li
      class="w-1/3 cursor-pointer rounded border-2 border-gray-400"
      :class="state === 'all' ? 'active' : ''"
    >
      <button @click="changeState('all')" class="w-full px-3 py-1">全部</button>
    </li>
    <li
      class="w-1/3 cursor-pointer rounded border-2 border-gray-400"
      :class="state === 'undone' ? 'active' : ''"
    >
      <button @click="changeState('undone')" class="w-full px-3 py-1">待完成</button>
    </li>
    <li
      class="w-1/3 cursor-pointer rounded border-2 border-gray-400"
      :class="state === 'done' ? 'active' : ''"
    >
      <button @click="changeState('done')" class="w-full px-3 py-1">已完成</button>
    </li>
  </ul>
</template>
