<script setup>
import { logIn } from '@/apis/api.js'
import { loginSuccess, checkInputAlert, errorAlert } from '@/alert'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const loginInputs = reactive({
  loginEmail: '',
  loginPassword: ''
})

const formDom = ref(null)
const resetForm = () => {
  formDom.value.reset()
}

const userLogin = async (account) => {
  try {
    const res = await logIn(account)
    loginSuccess(res.data.message)
    localStorage.setItem('userToken', res.headers.authorization)
    localStorage.setItem('userNickname', res.data.nickname)
    resetForm()
    router.push({ name: 'todo' })
  } catch (err) {
    errorAlert(err.response.data.message)
  }
}

const handleLogin = () => {
  const { loginEmail, loginPassword } = loginInputs
  if (loginEmail && loginPassword) {
    const account = {
      user: {
        email: loginEmail,
        password: loginPassword
      }
    }
    userLogin(account)
  } else {
    checkInputAlert()
  }
}
</script>

<template>
  <div @keyup.enter="handleLogin">
    <form ref="formDom">
      <div class="mb-5">
        <label for="loginEmail"
          ><p class="labeltxt">Email:</p>
          <input
            type="email"
            class="w-full rounded border-2 py-2 indent-2"
            placeholder="請輸入Email"
            name="loginEmail"
            v-model.trim="loginInputs.loginEmail"
          />
        </label>
        <span class="loginEmail-msg"></span>
      </div>

      <div class="mb-6">
        <label for="loginPassword"
          ><p class="labeltxt">密碼:</p>
          <input
            type="password"
            class="w-full rounded border-2 py-2 indent-2"
            placeholder="請輸入密碼"
            name="loginPassword"
            v-model.trim="loginInputs.loginPassword"
          />
        </label>
        <span class="loginPassword-msg"></span>
      </div>
      <div class="px-8">
        <button
          type="button"
          class="mb-5 block w-full rounded-md bg-green-300 py-2 text-center hover:bg-green-400"
          @click="handleLogin"
        >
          登入
        </button>
      </div>
    </form>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
