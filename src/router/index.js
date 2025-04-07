import { createRouter, createWebHistory } from 'vue-router'

// Importações de páginas
import Redirector from '../pages/Redirector.vue'
import Login from '../pages/Login.vue'
import Cadastro from '../pages/Cadastro.vue'
import Home from '../pages/Home.vue'
import Perfil from '../pages/Perfil.vue'
import MinhasReservas from '../pages/MinhasReservas.vue'
import SalaDetalhes from '../pages/SalaDetalhes.vue'
import ReservaConfirmada from '../pages/ReservaConfirmada.vue'
import ReservaDetalhes from '../pages/ReservaDetalhes.vue'

const routes = [
  // Rota inicial que redireciona conforme login
  { path: '/', component: Redirector },

  // Rotas abertas
  { path: '/login', component: Login },
  { path: '/cadastro', component: Cadastro },

  // Rotas protegidas (apenas para logados)
  { path: '/home', component: Home, meta: { requiresAuth: true } },
  { path: '/perfil', component: Perfil, meta: { requiresAuth: true } },
  { path: '/reservas', component: MinhasReservas, meta: { requiresAuth: true } },
  { path: '/detalhes/:id', component: SalaDetalhes, meta: { requiresAuth: true } },
  { path: '/reserva-confirmada', component: ReservaConfirmada, meta: { requiresAuth: true } },
  { path: '/reserva/:id', component: ReservaDetalhes, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Proteção de rotas (middleware)
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
