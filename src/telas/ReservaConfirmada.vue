<template>
    <v-container>
      <v-card class="pa-5">
        <h2 class="mb-4">Reserva Confirmada</h2>
  
        <div v-if="reserva">
          <p><strong>Número da Reserva:</strong> {{ reserva.id }}</p>
          <p><strong>Sala:</strong> {{ reserva.sala }}</p>
          <p><strong>Data:</strong> {{ reserva.data }}</p>
          <p><strong>Horário:</strong> {{ reserva.horario }}</p>
          <p v-if="reserva.nome"><strong>Nome:</strong> {{ reserva.nome }}</p>
          <p v-if="reserva.observacao"><strong>Observação:</strong> {{ reserva.observacao }}</p>
  
          <v-btn color="primary" class="mt-4" to="/reservas">Ver Minhas Reservas</v-btn>
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
    const id = route.query.id
    const reservas = JSON.parse(localStorage.getItem('reservas')) || []
    reserva.value = reservas.find((r) => r.id === id)
  })
  </script>
  