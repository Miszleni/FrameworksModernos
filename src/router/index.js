import { createRouter, createWebHistory } from 'vue-router'

// Páginas
import Login from '../pages/Login.vue'
import Cadastro from '../pages/Cadastro.vue'
import Home from '../pages/Home.vue'
import SalaDetalhes from '../pages/SalaDetalhes.vue'
import MinhasReservas from '../pages/MinhasReservas.vue'
import Perfil from '../pages/Perfil.vue'
import ReservaConfirmada from '../pages/ReservaConfirmada.vue'
import ReservaDetalhes from '../pages/ReservaDetalhes.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/cadastro', component: Cadastro },
  { path: '/home', component: Home, meta: { requiresAuth: true } },
  { path: '/detalhes/:id', component: SalaDetalhes, meta: { requiresAuth: true } },
  { path: '/reservas', component: MinhasReservas, meta: { requiresAuth: true } },
  { path: '/perfil', component: Perfil, meta: { requiresAuth: true } },
  { path: '/reserva-confirmada', component: ReservaConfirmada, meta: { requiresAuth: true } },
  { path: '/reserva/:id', component: ReservaDetalhes, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Proteção de rotas
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('usuario')

  if (to.meta.requiresAuth && !isLoggedIn) {
    alert('Você precisa estar logado para acessar essa página.')
    next('/')
  } else {
    next()
  }
})

export default router
