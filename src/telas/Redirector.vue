<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()

onMounted(() => {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'))

  if (usuario && usuario.email) {
    router.replace('/home') // Redireciona pro Home
  } else {
    router.replace('/login') // Volta pro Login
  }
})
</script>

<template>
  <div></div>
</template>
