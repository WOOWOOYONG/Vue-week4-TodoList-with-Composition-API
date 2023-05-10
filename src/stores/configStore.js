import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  const config = ref('')
  const getConfig = () => {
    const token = localStorage.getItem('userToken')
    config.value = {
      headers: {
        Authorization: token
      }
    }
  }
  return { config, getConfig }
})
