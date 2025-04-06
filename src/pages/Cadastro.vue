<template>
    <v-container>
      <h2>Cadastro de Usuário</h2>
      <v-text-field
        v-model="novoUsuario"
        label="Novo Usuário"
        :error="erroUsuario"
        :error-messages="erroUsuarioMsg"
      />
  
      <v-text-field
        v-model="novaSenha"
        label="Nova Senha"
        type="password"
        :error="erroSenha"
        :error-messages="erroSenhaMsg"
      />
  
      <v-text-field
        v-model="confirmarSenha"
        label="Confirmar Senha"
        type="password"
        :error="erroConfirmarSenha"
        :error-messages="erroConfirmarSenhaMsg"
      />
  
      <v-btn color="primary" @click="cadastrar">Cadastrar</v-btn>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const novoUsuario = ref('')
  const novaSenha = ref('')
  const confirmarSenha = ref('')
  const router = useRouter()
  
  // validações
  const erroUsuario = ref(false)
  const erroSenha = ref(false)
  const erroConfirmarSenha = ref(false)
  
  const erroUsuarioMsg = ref('')
  const erroSenhaMsg = ref('')
  const erroConfirmarSenhaMsg = ref('')
  
  function cadastrar() {
    erroUsuario.value = false
    erroSenha.value = false
    erroConfirmarSenha.value = false
    erroUsuarioMsg.value = ''
    erroSenhaMsg.value = ''
    erroConfirmarSenhaMsg.value = ''
  
    let valido = true
  
    // Validação usuário
    if (!novoUsuario.value || novoUsuario.value.length < 3) {
      erroUsuario.value = true
      erroUsuarioMsg.value = 'Usuário deve ter no mínimo 3 caracteres'
      valido = false
    }
  
    // Validação senha
    if (!novaSenha.value || novaSenha.value.length < 6) {
      erroSenha.value = true
      erroSenhaMsg.value = 'Senha deve ter pelo menos 6 caracteres'
      valido = false
    } else if (!/[A-Z]/.test(novaSenha.value)) {
      erroSenha.value = true
      erroSenhaMsg.value = 'Senha deve conter ao menos uma letra maiúscula'
      valido = false
    } else if (!/[0-9]/.test(novaSenha.value)) {
      erroSenha.value = true
      erroSenhaMsg.value = 'Senha deve conter ao menos um número'
      valido = false
    }
  
    // Confirmação de senha
    if (novaSenha.value !== confirmarSenha.value) {
      erroConfirmarSenha.value = true
      erroConfirmarSenhaMsg.value = 'As senhas não coincidem'
      valido = false
    }
  
    if (!valido) return
  
    // Tudo OK
    localStorage.setItem('usuario_cadastrado', novoUsuario.value)
    localStorage.setItem('senha_cadastrada', novaSenha.value)
    alert('Usuário cadastrado com sucesso!')
    router.push('/')
  }
  </script>
  