<script setup>
import { logOut } from '../apis/api.js'
import { useRouter } from 'vue-router'
import { logoutSuccess, errorAlert } from '../alert'
import { useConfigStore } from '@/stores/configStore'

const gloablConfig = useConfigStore()
const router = useRouter()

const redirectHome = () => {
  router.push({ name: 'home' })
}

const removeToken = () => {
  localStorage.removeItem('userToken')
  localStorage.removeItem('userNickName')
}

const userLogout = async () => {
  try {
    const res = await logOut(gloablConfig.config)
    if (res.status === 200) {
      logoutSuccess()
      removeToken()
      redirectHome()
    }
  } catch (err) {
    errorAlert(err.response.data.message)
  }
}
</script>

<template>
  <div class="absolute right-8 top-10">
    <button @click="userLogout" class="rounded bg-blue-900 px-2 py-1 text-white hover:bg-blue-600">
      登出
    </button>
  </div>
</template>
