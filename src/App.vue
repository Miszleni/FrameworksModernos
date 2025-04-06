<template>
  <v-app>
    <v-app-bar app color="blue-darken-2" dark>
      <!-- Se estiver logado -->
      <template v-if="usuarioLogado">
        <v-toolbar-title>CinePrivê</v-toolbar-title>
        <v-spacer />
        <v-btn to="/home" text>Home</v-btn>
        <v-btn to="/reservas" text>Minhas Reservas</v-btn>
        <v-btn to="/perfil" text>Perfil</v-btn>
      </template>

      <!-- Se NÃO estiver logado -->
      <template v-else>
        <v-toolbar-title class="text-center w-100">CinePrivê</v-toolbar-title>
      </template>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { computed } from 'vue'

const usuarioLogado = computed(() => {
  return !!localStorage.getItem('usuario')
})
</script>
