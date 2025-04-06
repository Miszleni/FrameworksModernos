<template>
  <v-card class="pa-4 mb-4" elevation="2">
    <h3 class="mb-2">{{ sala.nome }}</h3>

    <!-- STATUS dinâmico -->
    <div class="mb-3">
      <p><strong>📍 Status:</strong></p>
      <ul class="pl-3">
        <li v-if="horariosDisponiveisHoje.length > 0">
          ✅ Disponível hoje:
          <strong>{{ horariosDisponiveisHoje.join(', ') }}</strong>
        </li>
        <li v-else>
          🔴 Todos os horários de hoje já estão expirarados ou reservados!
        </li>
        <li v-for="(r, i) in reservasFuturas" :key="i">
          📅 Reservado: {{ r.data }} às {{ r.horario }}
        </li>
      </ul>
    </div>

    <!-- CAPACIDADE -->
    <p><strong>Capacidade:</strong> {{ sala.capacidade }} pessoas</p>
    <p class="mb-2"><em>{{ sala.descricao }}</em></p>

    <!-- HORÁRIOS COM CORES -->
    <div class="mb-3">
      <strong>Horários de hoje:</strong>
      <v-chip
        v-for="(hora, i) in sala.horarios"
        :key="i"
        class="ma-1"
        size="small"
        :color="corDoHorario(hora)"
        variant="flat"
      >
        {{ hora }}
      </v-chip>
    </div>

    <!-- BOTÃO -->
    <v-btn :to="`/detalhes/${sala.id}`" color="deep-purple-darken-2" variant="elevated">
      Ver Detalhes
    </v-btn>
  </v-card>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  sala: {
    type: Object,
    required: true
  },
  refreshKey: {
    type: Number,
    default: 0
  }
})

// Variáveis reativas
const reservas = ref([])
const horariosDisponiveisHoje = ref([])
const reservasFuturas = ref([])

// Data atual (pt-BR)
const hoje = new Date()
const hojeStr = hoje.toLocaleDateString('pt-BR')

// Atualiza dinamicamente quando refreshKey muda
watchEffect(() => {
  const todasReservas = JSON.parse(localStorage.getItem('reservas')) || []

  // Reservas da sala atual
  reservas.value = todasReservas.filter((r) => r.sala === props.sala.nome)

  // Horários reservados para hoje
  const reservadosHoje = reservas.value
    .filter((r) => r.data === hojeStr)
    .map((r) => r.horario)

  // Horários de hoje que ainda não passaram e não estão reservados
  const agora = new Date()
  horariosDisponiveisHoje.value = props.sala.horarios.filter((horario) => {
    const [h, m] = horario.split(':').map(Number)
    const horarioDate = new Date()
    horarioDate.setHours(h, m, 0, 0)
    return (
      horarioDate.getTime() > agora.getTime() &&
      !reservadosHoje.includes(horario)
    )
  })

  // Reservas em outras datas (futuras)
  reservasFuturas.value = reservas.value.filter((r) => r.data !== hojeStr)
})

// Define cor com base no status do horário
function corDoHorario(horario) {
  const [h, m] = horario.split(':').map(Number)
  const agora = new Date()
  const horaAtual = agora.getHours()
  const minutoAtual = agora.getMinutes()

  const horarioMs = new Date()
  horarioMs.setHours(h, m, 0, 0)

  const reservado = reservas.value.some(
    (r) => r.data === hojeStr && r.horario === horario
  )

  if (reservado) return 'grey'
  if (horarioMs.getTime() < agora.getTime()) return 'red'
  return 'green'
}
</script>
