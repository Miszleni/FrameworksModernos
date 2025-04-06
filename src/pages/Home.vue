<template>
  <v-container>
    <!-- Cabeçalho e info de ultima atualização -->
    <div class="d-flex align-center justify-space-between mb-4">
      <h2>🎬 Salas Disponíveis</h2>
      <span class="text-caption text-grey-darken-1">
        ⏱ Última atualização: há {{ tempoDesdeUltimaAtualizacao }}s
      </span>
    </div>

    <p class="text-caption mb-4">Total de salas: {{ salas.length }}</p>

    <!-- Renderização dos cards -->
    <v-row>
      <v-col
        v-for="sala in salas"
        :key="sala.id"
        cols="12"
        md="4"
      >
        <SalaCard :sala="sala" :refreshKey="refreshKey" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import SalaCard from '../components/SalaCard.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Chave de atualizaça o para SalaCard
const refreshKey = ref(0)

// Marca a hora da ultima atualização
const ultimaAtualizacao = ref(Date.now())

// Tempo que passou desde a ultima atualizaçao (em segundos)
const tempoDesdeUltimaAtualizacao = ref(0)

// Funçao central que atualiza tudo
function atualizarAgora() {
  refreshKey.value++
  ultimaAtualizacao.value = Date.now()
}

// Lista mock de salas
const salas = [
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

// Quando a tela carrega
onMounted(() => {
  // Atualiza automaticamente a cada 10 segundos
  const intervalRefresh = setInterval(() => {
    atualizarAgora()
  }, 10000)

  // Atualiza o contador de tempo desde a ultima atualização
  const intervalTimer = setInterval(() => {
    tempoDesdeUltimaAtualizacao.value = Math.floor(
      (Date.now() - ultimaAtualizacao.value) / 1000
    )
  }, 1000)

  // Escuta atualizações feitas por outras paginas (via localStorage)
  window.addEventListener('storage', (e) => {
    if (e.key === 'lastRefresh') {
      atualizarAgora()
    }
  })

  // Limpa os intervals ao sair da pagina
  onBeforeUnmount(() => {
    clearInterval(intervalRefresh)
    clearInterval(intervalTimer)
  })
})
</script>
