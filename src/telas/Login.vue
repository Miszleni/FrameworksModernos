<template>
  <v-container>
    <v-card class="pa-6 mx-auto" max-width="400">
      <h2 class="text-center mb-4">🔐 Login</h2>

      <v-text-field
        label="E-mail"
        v-model="email"
        type="email"
        required
      />

      <v-text-field
        label="Senha"
        v-model="senha"
        type="password"
        required
      />

      <v-btn
        class="mt-4"
        color="blue-darken-2"
        block
        @click="fazerLogin"
      >
        Entrar
      </v-btn>

      <div class="text-center mt-3">
        <span>Não tem uma conta?</span>
        <RouterLink to="/cadastro" class="text-primary font-weight-bold">
          Cadastre-se
        </RouterLink>
      </div>

      <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">
        {{ snackbarMsg }}
      </v-snackbar>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const senha = ref('')
const router = useRouter()

const snackbar = ref(false)
const snackbarMsg = ref('')
const snackbarColor = ref('success')

function fazerLogin() {
  const usuarioSalvo = JSON.parse(localStorage.getItem('usuarioLogado'))

  if (
    usuarioSalvo &&
    usuarioSalvo.email === email.value &&
    usuarioSalvo.senha === senha.value
  ) {
    snackbarMsg.value = 'Login realizado com sucesso!'
    snackbarColor.value = 'success'
    snackbar.value = true

    setTimeout(() => {
      router.push('/home')
    }, 1000)
  } else {
    snackbarMsg.value = 'E-mail ou senha incorretos'
    snackbarColor.value = 'error'
    snackbar.value = true
  }
}
</script>
