<template>
  <v-app>
    <!-- Navbar condicional -->
    <v-app-bar app color="blue-darken-2" dark>
      <!-- Se estiver logado -->
      <template v-if="usuarioLogado">
        <v-toolbar-title>CinePrivê</v-toolbar-title>
        <v-spacer />

        <v-btn to="/home" text>Home</v-btn>
        <v-btn to="/reservas" text>Minhas Reservas</v-btn>
        <v-btn to="/perfil" text>Perfil</v-btn>

        <!-- Botão de logout -->
        <v-btn text color="red-darken-3" @click="logout">
          Sair
        </v-btn>
      </template>

      <!-- Se NÃO estiver logado -->
      <template v-else>
        <v-toolbar-title class="text-center w-100">CinePrivê</v-toolbar-title>
      </template>
    </v-app-bar>

    <!-- Conteudo da pagina -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Checa se o usuário está logado
const usuarioLogado = computed(() => {
  return !!localStorage.getItem('usuarioLogado')
})

// Logout: limpa localStorage e volta pro login
function logout() {
  localStorage.removeItem('usuarioLogado')
  router.push('/login')
}
</script>
