<template>
    <v-container>
      <h2 class="mb-4">👤 Perfil do Usuário</h2>
  
      <!-- Avatar com iniciais: testando -->
      <v-avatar size="96" class="mb-4">
        <v-icon icon="mdi-account-circle" size="96"></v-icon>
      </v-avatar>
  
      <!-- Nome do usuario -->
      <v-card class="pa-4 mb-4">
        <h3>Nome de Usuário</h3>
        <v-text-field v-model="usuario" label="Editar Nome" />
        <v-btn color="primary" @click="salvarNome">Salvar Nome</v-btn>
      </v-card>
  
      <!-- Alterar senha -->
      <v-card class="pa-4 mb-4">
        <h3>Alterar Senha</h3>
        <v-text-field
          v-model="novaSenha"
          label="Nova Senha"
          type="password"
          :error="erroSenha"
          :error-messages="erroSenhaMsg"
        />
        <v-text-field
          v-model="confirmarSenha"
          label="Confirmar Nova Senha"
          type="password"
          :error="erroConfirmar"
          :error-messages="erroConfirmarMsg"
        />
        <v-btn color="primary" @click="trocarSenha">Salvar Nova Senha</v-btn>
      </v-card>
  
      <!-- Açoes -->
      <v-card class="pa-4 mb-4">
        <h3>Histórico de Ações</h3>
        <ul>
          <li>✔️ Login realizado hoje</li>
          <li>✔️ Última troca de senha: 05/04/2025</li>
        </ul>
      </v-card>
  
      <!-- Modo claro/escuro -->
      <v-btn
        class="me-2"
        @click="alternarTema"
        :color="isDark ? 'yellow-darken-3' : 'blue-darken-3'"
      >
        {{ isDark ? '☀️ Modo Claro' : '🌙 Modo Escuro' }}
      </v-btn>
  
      <!-- Açoes finais -->
      <v-btn color="error" class="me-2" @click="logout">Sair da Conta</v-btn>
      <v-btn color="red-darken-4" @click="excluirConta">Excluir Conta</v-btn>
  
      <!-- Snackbar -->
      <v-snackbar v-model="snackbar" :timeout="3000" color="green-darken-2">
        {{ snackbarMsg }}
        <template #actions>
          <v-btn variant="text" color="white" @click="snackbar = false">
            Fechar
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useTheme } from 'vuetify'
  
  const router = useRouter()
  const theme = useTheme()
  
  // Dados do usuario
  const usuario = ref('')
  const novaSenha = ref('')
  const confirmarSenha = ref('')
  
  // Temas
  const isDark = ref(false)
  const snackbar = ref(false)
  const snackbarMsg = ref('')
  
  // Erros
  const erroSenha = ref(false)
  const erroSenhaMsg = ref('')
  const erroConfirmar = ref(false)
  const erroConfirmarMsg = ref('')
  
  onMounted(() => {
    const user = localStorage.getItem('usuario')
    if (user) {
      usuario.value = user
    } else {
      router.push('/')
    }
  
    isDark.value = theme.global.name.value === 'dark'
  })
  
  function salvarNome() {
    if (usuario.value.length < 3) {
      snackbarMsg.value = 'Nome deve ter no mínimo 3 caracteres'
      snackbar.value = true
      return
    }
  
    localStorage.setItem('usuario', usuario.value)
    localStorage.setItem('usuario_cadastrado', usuario.value)
    snackbarMsg.value = 'Nome atualizado com sucesso!'
    snackbar.value = true
  }
  
  function trocarSenha() {
    erroSenha.value = false
    erroConfirmar.value = false
    erroSenhaMsg.value = ''
    erroConfirmarMsg.value = ''
  
    if (!novaSenha.value || novaSenha.value.length < 6) {
      erroSenha.value = true
      erroSenhaMsg.value = 'A senha deve ter pelo menos 6 caracteres'
      return
    }
  
    if (!/[A-Z]/.test(novaSenha.value)) {
      erroSenha.value = true
      erroSenhaMsg.value = 'A senha deve conter ao menos uma letra maiúscula'
      return
    }
  
    if (!/[0-9]/.test(novaSenha.value)) {
      erroSenha.value = true
      erroSenhaMsg.value = 'A senha deve conter ao menos um número'
      return
    }
  
    if (novaSenha.value !== confirmarSenha.value) {
      erroConfirmar.value = true
      erroConfirmarMsg.value = 'As senhas não coincidem'
      return
    }
  
    localStorage.setItem('senha', novaSenha.value)
    localStorage.setItem('senha_cadastrada', novaSenha.value)
  
    novaSenha.value = ''
    confirmarSenha.value = ''
  
    snackbarMsg.value = 'Senha atualizada com sucesso!'
    snackbar.value = true
  }
  
  function logout() {
    localStorage.removeItem('usuario')
    localStorage.removeItem('senha')
    router.push('/')
  }
  
  function excluirConta() {
    const confirmar = confirm('Tem certeza que deseja excluir sua conta? 😢')
    if (confirmar) {
      localStorage.clear()
      router.push('/cadastro')
    }
  }
  
  function alternarTema() {
    const novoTema = isDark.value ? 'light' : 'dark'
    theme.global.name.value = novoTema
    isDark.value = !isDark.value
  }
  </script>
  