<script setup>
import { ref } from 'vue'
import LoginForm from '@/components/LoginForm.vue'
import SignUpForm from '@/components/SignUpForm.vue'

const showLogin = ref(true)
function updateShowLogin(newVal) {
  showLogin.value = newVal
}
</script>

<template>
  <div class="home mx-auto max-w-[1920px]">
    <h1 class="mb-20 text-3xl font-bold">歡迎來到你的待辦清單</h1>
    <div
      class="mx-auto flex max-w-[80%] flex-col items-center justify-center gap-2 md:flex-row md:items-start md:gap-6 lg:max-w-[40%]"
    >
      <div class="w-full md:w-[50%]">
        <img
          src="https://i.pinimg.com/originals/73/e4/26/73e4261f0cf991cdca702c53bba90597.gif"
          alt="cover"
          class="h-auto max-w-full rounded-xl"
        />
      </div>
      <div class="w-full md:w-[50%]">
        <div v-if="showLogin">
          <LoginForm />
        </div>
        <div v-else>
          <SignUpForm :show-login="showLogin" @updateShowLogin="updateShowLogin" />
        </div>
        <div class="px-8">
          <button
            class="w-full rounded-md bg-[#c8d8e8] py-2 hover:bg-blue-200"
            @click="showLogin = !showLogin"
          >
            {{ showLogin ? '註冊新帳號' : '返回登入頁' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
