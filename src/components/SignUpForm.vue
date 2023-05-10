<script setup>
import { signUp } from '../apis/api.js'
import { signUpSuccess, checkInputAlert, errorAlert } from '@/alert'
import { defineProps, defineEmits, ref, reactive } from 'vue'

const props = defineProps({
  showLogin: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['updateShowLogin'])

const sigUpInputs = reactive({
  signUpEmail: '',
  nickName: '',
  signUpPassWord: '',
  confirmPassword: ''
})

const showLoginForm = ref(props.showLogin)

const formDom = ref(null)
const resetForm = () => {
  formDom.value.reset()
}

const moveToLogin = () => {
  showLoginForm.value = true
  emits('updateShowLogin', showLoginForm)
}

const handleSignUp = () => {
  const { signUpEmail, nickName, signUpPassWord, confirmPassword } = sigUpInputs
  if (signUpEmail && nickName && signUpPassWord && confirmPassword) {
    const newUser = {
      user: {
        email: signUpEmail,
        nickname: nickName,
        password: signUpPassWord
      }
    }
    signUp(newUser)
      .then((res) => {
        signUpSuccess(res.data.message)
        resetForm()
        moveToLogin()
      })
      .catch((err) => errorAlert(err.response.data.message))
  } else {
    checkInputAlert()
  }
}
</script>

<template>
  <div @keyup.enter="handleSignUp">
    <form class="loginForm" ref="formDom">
      <div class="mb-5">
        <label for="signUpEmail"
          ><p class="labeltxt">Email:</p>
          <input
            type="email"
            class="w-full rounded border-2 py-2 indent-2"
            placeholder="請輸入Email"
            name="signUpEmail"
            v-model.trim="sigUpInputs.signUpEmail"
          />
        </label>
        <span></span>
      </div>
      <div class="mb-5">
        <label for="nickName"
          ><p class="labeltxt">暱稱:</p>
          <input
            type="text"
            class="w-full rounded border-2 py-2 indent-2"
            placeholder="請輸入暱稱"
            name="nickName"
            v-model.trim="sigUpInputs.nickName"
          />
        </label>
        <span></span>
      </div>
      <div class="mb-5">
        <label for="signUpPassword">
          <p class="labeltxt">密碼:</p>
          <input
            type="password"
            class="w-full rounded border-2 py-2 indent-2"
            placeholder="請輸入密碼"
            name="signUpPassword"
            v-model.trim="sigUpInputs.signUpPassWord"
        /></label>
        <span></span>
      </div>
      <div class="mb-8">
        <label for="confirmPassword"
          ><p class="labeltxt">再次輸入密碼:</p>
          <input
            type="password"
            class="w-full rounded border-2 py-2 indent-2"
            placeholder="請再次輸入密碼"
            name="confirmPassword"
            v-model.trim="sigUpInputs.confirmPassword"
          />
        </label>
        <span></span>
      </div>
      <div class="px-8">
        <button
          type="button"
          class="mb-5 block w-full rounded-md bg-green-300 py-2 text-center hover:bg-green-400"
          @click="handleSignUp"
        >
          註冊
        </button>
      </div>
    </form>
  </div>
</template>
