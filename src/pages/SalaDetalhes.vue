<template>
  <v-container>
    <v-card class="pa-5">
      <h2>{{ sala?.nome }}</h2>
      <p><strong>Capacidade:</strong> {{ sala?.capacidade }} pessoas</p>
      <p class="mb-3"><em>{{ sala?.descricao }}</em></p>

      <v-text-field
        v-model="nomeReserva"
        label="Nome da reserva (opcional)"
        class="mb-3"
      />
      <v-textarea
        v-model="observacao"
        label="Observações (opcional)"
        class="mb-3"
      />

      <v-text-field
        v-model="dataSelecionada"
        label="Escolha a data"
        type="date"
        class="mb-3"
        :min="hojeFormatada"
      />

      <strong>Horários disponíveis:</strong>
      <v-chip-group v-model="horarioSelecionado" mandatory class="my-3">
        <v-chip
          v-for="(horario, index) in horariosDisponiveis"
          :key="index"
          :value="horario"
          color="blue"
        >
          {{ horario }}
        </v-chip>
      </v-chip-group>

      <v-btn
        :disabled="!horarioSelecionado || horariosDisponiveis.length === 0"
        color="green-darken-2"
        @click="reservarSala"
      >
        Reservar
      </v-btn>

      <v-snackbar v-model="snackbar" :color="snackbarTipo" timeout="3000">
        {{ snackbarMsg }}
        <template #actions>
          <v-btn variant="text" @click="snackbar = false">Fechar</v-btn>
        </template>
      </v-snackbar>
    </v-card>
  </v-container>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'

const route = useRoute()
const router = useRouter()
const salaId = parseInt(route.params.id)

const horarioSelecionado = ref(null)
const dataSelecionada = ref('')
const nomeReserva = ref('')
const observacao = ref('')
const snackbar = ref(false)
const snackbarMsg = ref('')
const snackbarTipo = ref('success')

const hoje = new Date()
const hojeFormatada = hoje.toISOString().split('T')[0]

const todasSalas = [
  {
    id: 1,
    nome: 'Sala Classic',
    capacidade: 20,
    descricao: 'Para sessões casuais com tela HD e som estéreo.',
    horarios: ['14:00', '16:00', '18:00']
  },
  {
    id: 2,
    nome: 'Sala Premium',
    capacidade: 40,
    descricao: 'Poltronas reclináveis e Dolby Atmos.',
    horarios: ['15:00', '17:30', '20:00']
  },
  {
    id: 3,
    nome: 'Sala IMAX Experience',
    capacidade: 60,
    descricao: 'Tela gigante e som imersivo.',
    horarios: ['13:00', '16:00', '21:00']
  },
  {
    id: 4,
    nome: 'Sala Noir',
    capacidade: 25,
    descricao: 'Cinema clássico em preto e branco.',
    horarios: ['10:00', '12:00', '14:00']
  },
  {
    id: 5,
    nome: 'Sala Animação',
    capacidade: 30,
    descricao: 'Ambiente lúdico para crianças.',
    horarios: ['11:00', '13:30', '16:00']
  },
  {
    id: 6,
    nome: 'Sala Lounge',
    capacidade: 15,
    descricao: 'Espaço com sofás, puffs e snacks.',
    horarios: ['19:00', '21:30']
  }
]

const sala = todasSalas.find((s) => s.id === salaId)

const horariosDisponiveis = computed(() => {
  if (!dataSelecionada.value) return []

  const dataEscolhida = new Date(dataSelecionada.value)
  const hojeData = new Date()
  const horarios = sala?.horarios || []

  if (dataEscolhida.getTime() > hojeData.setHours(0, 0, 0, 0)) {
    return horarios
  }

  const agora = new Date()
  const horaAtual = agora.getHours()
  const minutoAtual = agora.getMinutes()

  return horarios.filter((h) => {
    const [hStr, mStr] = h.split(':')
    const hora = parseInt(hStr)
    const minuto = parseInt(mStr)
    return hora > horaAtual || (hora === horaAtual && minuto > minutoAtual)
  })
})

function reservarSala() {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'))

  if (!usuario || !usuario.email) {
    snackbarMsg.value = 'Você precisa estar logado para reservar!'
    snackbarTipo.value = 'error'
    snackbar.value = true
    router.push('/login')
    return
  }

  const reservas = JSON.parse(localStorage.getItem('reservas')) || []

  const novaReserva = {
    id: crypto.randomUUID(),
    sala: sala.nome,
    salaId: sala.id,
    horario: horarioSelecionado.value,
    data: dataSelecionada.value.split('-').reverse().join('/'),
    nome: nomeReserva.value,
    observacao: observacao.value,
    usuarioEmail: usuario.email // 🔐 ESSENCIAL!
  }

  const jaExiste = reservas.some(
    (res) =>
      res.sala === novaReserva.sala &&
      res.horario === novaReserva.horario &&
      res.data === novaReserva.data
  )

  if (jaExiste) {
    snackbarMsg.value = 'Essa sala já está reservada nesse horário!'
    snackbarTipo.value = 'error'
    snackbar.value = true
    return
  }

  reservas.push(novaReserva)
  localStorage.setItem('reservas', JSON.stringify(reservas))
  localStorage.setItem('lastRefresh', Date.now().toString())

  router.push(`/reserva-confirmada?id=${novaReserva.id}`)
}
</script>
