<template>
  <v-container>
    <h2>📋 Minhas Reservas</h2>
    <p class="mb-4">Total de reservas: <strong>{{ reservas.length }}</strong></p>

    <v-alert
      v-if="reservas.length === 0"
      type="info"
      variant="outlined"
      class="mt-4"
    >
      Você ainda não fez nenhuma reserva.
    </v-alert>

    <div v-for="(grupo, data) in reservasAgrupadas" :key="data" class="mb-6">
      <h3 class="mb-2">📅 {{ data }}</h3>

      <v-card
        v-for="(reserva, index) in grupo"
        :key="index"
        class="mb-3 pa-4"
        elevation="2"
      >
        <p><strong>Sala:</strong> {{ reserva.sala }}</p>
        <p><strong>Horário:</strong> {{ reserva.horario }}</p>
        <p v-if="reserva.nome"><strong>Para:</strong> {{ reserva.nome }}</p>
        <p v-if="reserva.observacao"><strong>Observações:</strong> {{ reserva.observacao }}</p>

        <v-btn
          :to="`/reserva/${reserva.id}`"
          color="primary"
          class="mt-2 me-2"
        >
          Ver Detalhes
        </v-btn>

        <v-btn color="red-darken-3" @click="cancelarReserva(data, reserva)">
          Cancelar Reserva
        </v-btn>
      </v-card>
    </div>

    <v-snackbar v-model="snackbar" color="error" timeout="3000">
      Reserva cancelada com sucesso!
      <template #actions>
        <v-btn variant="text" @click="snackbar = false">Fechar</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const reservas = ref([])
const snackbar = ref(false)

onMounted(() => {
  carregarReservas()
})

function carregarReservas() {
  const dados = localStorage.getItem('reservas')
  reservas.value = dados ? JSON.parse(dados) : []
}

// Agrupar por data
const reservasAgrupadas = computed(() => {
  const grupos = {}
  reservas.value.forEach((reserva) => {
    if (!grupos[reserva.data]) {
      grupos[reserva.data] = []
    }
    grupos[reserva.data].push(reserva)
  })
  return grupos
})

function cancelarReserva(data, reservaAlvo) {
  if (confirm('Deseja mesmo cancelar esta reserva?')) {
    reservas.value = reservas.value.filter(
      (reserva) =>
        !(
          reserva.sala === reservaAlvo.sala &&
          reserva.horario === reservaAlvo.horario &&
          reserva.data === data &&
          reserva.id === reservaAlvo.id
        )
    )
    localStorage.setItem('reservas', JSON.stringify(reservas.value))
    snackbar.value = true
  }
}
</script>
