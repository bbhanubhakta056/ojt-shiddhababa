// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
// import Auth from '../Auth.vue'
import HomePage from '../pages/HomePage.vue';
import LoginPage from '../pages/Login.vue';

const routes = [
  
  { path: '/', name:'home', redirect: '/auth' },
  { path: '/home', name:'log', component: HomePage },
  { path: '/login', name:'in', component: LoginPage },
  
//   { path: '/auth', name:'auth', component: Auth },
//   { path: '/dashboard', name:'home', component: Dashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// // Optional: protect dashboard route
// router.beforeEach((to, from, next) => {
//   // const token = localStorage.getItem('token');
//   if (to.path === '/dashboard' && !token) {
//     next('/login');
//   } else {
//     next();
//   }
// });

export default router;
