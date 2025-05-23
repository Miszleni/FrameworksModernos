import { createRouter, createWebHistory } from 'vue-router'

// Importaçoes d e telas
import Redirector from '../telas/Redirector.vue'
import Login from '../telas/Login.vue'
import Cadastro from '../telas/Cadastro.vue'
import Home from '../telas/Home.vue'
import Perfil from '../telas/Perfil.vue'
import Reservas from '../telas/Reservas.vue'
import SalaDetalhes from '../telas/SalaDetalhes.vue'
import ReservaConfirmada from '../telas/ReservaConfirmada.vue'
import ReservaDetalhes from '../telas/ReservaDetalhes.vue'

const routes = [
  // Rota inicial que redireciona conforme login
  { path: '/', component: Redirector },

  // Rotas abertas
  { path: '/login', component: Login },
  { path: '/cadastro', component: Cadastro },

  // Rotas protegidas (apenas para logados)
  { path: '/home', component: Home, meta: { requiresAuth: true } },
  { path: '/perfil', component: Perfil, meta: { requiresAuth: true } },
  { path: '/reservas', component: Reservas, meta: { requiresAuth: true } },
  { path: '/detalhes/:id', component: SalaDetalhes, meta: { requiresAuth: true } },
  { path: '/reserva-confirmada', component: ReservaConfirmada, meta: { requiresAuth: true } },
  { path: '/reserva/:id', component: ReservaDetalhes, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Proteçao de rotas
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('usuarioLogado')

  if (to.meta.requiresAuth && !isLoggedIn) {
    alert('Você precisa estar logado para acessar essa página.')
    next('/login')
  } else {
    next()
  }
})

export default router
