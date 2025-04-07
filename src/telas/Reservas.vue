<template>
  <v-container>
    <h2 class="text-h5 mb-4">📅 Minhas Reservas</h2>

    <v-alert
      v-if="reservas.length === 0"
      type="info"
      class="mt-4"
    >
      Você ainda não fez nenhuma reserva.
    </v-alert>

    <v-row v-else>
      <v-col
        v-for="(reserva, index) in reservas"
        :key="index"
        cols="12"
        md="6"
      >
        <v-card class="mb-4" elevation="2">
          <v-card-title class="d-flex justify-space-between align-center">
            <span>🎟️ Reserva #{{ index + 1 }}</span>

            <!-- Botão de cancelar com icone -->
            <v-btn
              size="small"
              color="red-darken-2"
              variant="outlined"
              @click="cancelarReserva(index)"
            >
              <v-icon start>mdi-delete</v-icon>
              Cancelar
            </v-btn>
          </v-card-title>

          <v-card-text>
            <p><strong>Sala:</strong> {{ reserva.sala || reserva.salaNome }}</p>
            <p><strong>Data:</strong> {{ reserva.data }}</p>
            <p><strong>Horário:</strong> {{ reserva.horario }}</p>
            <p><strong>Nome Reservante:</strong> {{ reserva.nome }}</p>
            <p v-if="reserva.observacao"><strong>Observações:</strong> {{ reserva.observacao }}</p>
          </v-card-text>

          <v-card-actions>
            <RouterLink :to="`/reserva/${reserva.id}`">
              <v-btn color="primary" variant="text">
                Ver Detalhes
              </v-btn>
            </RouterLink>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" color="success" timeout="2500">
      Reserva cancelada com sucesso!
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const reservas = ref([])
const snackbar = ref(false)

onMounted(() => {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'))
  const todasReservas = JSON.parse(localStorage.getItem('reservas')) || []

  reservas.value = todasReservas.filter(
    r => r.usuarioEmail === usuario?.email
  )
})

function cancelarReserva(index) {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'))
  const todasReservas = JSON.parse(localStorage.getItem('reservas')) || []

  const reservasUsuario = todasReservas.filter(
    r => r.usuarioEmail === usuario.email
  )

  reservasUsuario.splice(index, 1)

  const reservasOutrosUsuarios = todasReservas.filter(
    r => r.usuarioEmail !== usuario.email
  )

  const novasReservas = [...reservasOutrosUsuarios, ...reservasUsuario]
  localStorage.setItem('reservas', JSON.stringify(novasReservas))

  reservas.value = reservasUsuario
  snackbar.value = true
}
</script>
