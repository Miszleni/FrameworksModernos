<template>
  <v-container>
    <v-card class="pa-6 mx-auto" max-width="500">
      <h2 class="text-center mb-4">📝 Cadastro</h2>

      <v-text-field
        label="Nome"
        v-model="nome"
        required
      />

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
        :rules="[senhaMinima]"
      />

      <v-text-field
        label="Confirmar Senha"
        v-model="confirmarSenha"
        type="password"
        required
        :rules="[confirmaSenha]"
      />

      <v-btn
        class="mt-4"
        color="green-darken-1"
        block
        @click="fazerCadastro"
      >
        Criar Conta
      </v-btn>

      <!-- Link para login -->
      <div class="text-center mt-3">
        <span>Já tem uma conta?</span>
        <RouterLink to="/login" class="text-primary font-weight-bold">
          Entrar
        </RouterLink>
      </div>

      <!-- Snackbar de feedback -->
      <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">
        {{ snackbarMsg }}
      </v-snackbar>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const nome = ref('')
const email = ref('')
const senha = ref('')
const confirmarSenha = ref('')

const snackbar = ref(false)
const snackbarMsg = ref('')
const snackbarColor = ref('success')

const router = useRouter()

// Validaçoes
const senhaMinima = (v) =>
  v.length >= 6 || 'A senha deve ter pelo menos 6 caracteres'

const confirmaSenha = () =>
  senha.value === confirmarSenha.value || 'As senhas não coincidem'

function fazerCadastro() {
  if (!nome.value || !email.value || !senha.value || !confirmarSenha.value) {
    snackbarMsg.value = 'Preencha todos os campos obrigatórios'
    snackbarColor.value = 'error'
    snackbar.value = true
    return
  }

  if (senha.value !== confirmarSenha.value) {
    snackbarMsg.value = 'As senhas não coincidem'
    snackbarColor.value = 'error'
    snackbar.value = true
    return
  }

  // Salva o usuário no localStorage com email (essencial para filtro de reservas)
  const novoUsuario = {
    nome: nome.value,
    email: email.value,
    senha: senha.value
  }

  localStorage.setItem('usuarioLogado', JSON.stringify(novoUsuario))

  snackbarMsg.value = 'Cadastro realizado com sucesso!'
  snackbarColor.value = 'success'
  snackbar.value = true

  setTimeout(() => {
    router.push('/home') // vai direto pra home após cadastro
  }, 1500)
}
</script>
