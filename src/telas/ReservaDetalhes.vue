<template>
    <v-container>
      <v-card class="pa-5">
        <h2 class="mb-4">📄 Detalhes da Reserva</h2>
  
        <div v-if="reserva">
          <p><strong>ID:</strong> {{ reserva.id }}</p>
          <p><strong>Sala:</strong> {{ reserva.sala }}</p>
          <p><strong>Data:</strong> {{ reserva.data }}</p>
          <p><strong>Horário:</strong> {{ reserva.horario }}</p>
          <p v-if="reserva.nome"><strong>Para:</strong> {{ reserva.nome }}</p>
          <p v-if="reserva.observacao"><strong>Observações:</strong> {{ reserva.observacao }}</p>
        </div>
  
        <div v-else>
          <v-alert type="error">Reserva não encontrada.</v-alert>
        </div>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  import { ref, onMounted } from 'vue'
  
  const route = useRoute()
  const reserva = ref(null)
  
  onMounted(() => {
    const id = route.params.id
    const reservas = JSON.parse(localStorage.getItem('reservas')) || []
    reserva.value = reservas.find((r) => r.id === id)
  })
  </script>
  