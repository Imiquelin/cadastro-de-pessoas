import { createRouter, createWebHistory } from 'vue-router';  // Usando corretamente no Vue Router 4
import AuthTabs from '@/views/AuthTabs.vue';  // Importar o componente de abas
import RegisterPage from '@/views/RegisterPage.vue';
import UsersPage from '@/views/UsersPage.vue';
import EditUserPage from '@/views/EditUser.vue';  // Importar a página de edição

const routes = [
  {
    path: '/',
    redirect: () => {
      const token = localStorage.getItem('jwt');
      return token ? '/users' : '/auth';  // Redireciona para login ou lista de usuários conforme o token
    }
  },
  {
    path: '/auth',
    name: 'AuthTabs',
    component: AuthTabs,
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage,
  },
  {
    path: '/users',
    name: 'UsersPage',
    component: UsersPage,
    meta: { requiresAuth: true },  // Esta rota requer autenticação
  },
  {
    path: '/edit-user/:id',  // Rota para editar o usuário
    name: 'EditUserPage',
    component: EditUserPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    redirect: () => {
      return '/auth';
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Verificar o token JWT antes de cada navegação
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('jwt');  // Pegar o token JWT do localStorage
  
  // Se a rota exigir autenticação e não houver token, redireciona para login
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next('/auth');
  } else {
    next();  // Se houver token ou a rota não requerer autenticação, permite o acesso
  }
});

export default router;
