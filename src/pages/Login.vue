<template>
  <v-container>
    <div v-if="!logado">
      <h2>Login</h2>
      <v-text-field v-model="usuario" label="Usuário" />
      <v-text-field v-model="senha" label="Senha" type="password" />
      <v-btn color="primary" @click="fazerLogin">Entrar</v-btn>
      <v-btn variant="text" color="secondary" @click="router.push('/cadastro')">
        Criar nova conta
      </v-btn>
    </div>

    <div v-else>
      <h2>Bem-vindo, {{ usuario }}!</h2>
      <v-btn color="error" @click="logout">Sair</v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const usuario = ref('')
const senha = ref('')
const logado = ref(false)
const router = useRouter()

onMounted(() => {
  const user = localStorage.getItem('usuario')
  const pass = localStorage.getItem('senha')
  if (user && pass) {
    usuario.value = user
    senha.value = pass
    logado.value = true
  }
})

function fazerLogin() {
  const userCadastrado = localStorage.getItem('usuario_cadastrado')
  const senhaCadastrada = localStorage.getItem('senha_cadastrada')

  if (usuario.value === userCadastrado && senha.value === senhaCadastrada) {
    localStorage.setItem('usuario', usuario.value)
    localStorage.setItem('senha', senha.value)
    logado.value = true
    router.push('/home')
  } else {
    alert('Usuário ou senha inválidos!')
  }
}

function logout() {
  localStorage.removeItem('usuario')
  localStorage.removeItem('senha')
  usuario.value = ''
  senha.value = ''
  logado.value = false
  router.push('/')
}
</script>
