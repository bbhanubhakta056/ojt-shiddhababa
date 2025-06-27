// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
// import Auth from '../Auth.vue'
import LoginPage from '../pages/Login.vue';
import HomePage from '../pages/HomePage.vue';
import ViewStudent from '../pages/profile/ViewStudent.vue';
// import UserProfile from '../pages/UserProfile.vue';
// import Dashboard from '../pages/Dashboard.vue';

const routes = [
  { path: '/', name:'home', redirect: '/login' },
  { path: '/home', name:'log', component: HomePage },
  { path: '/login', name:'in', component: LoginPage },
  { path: '/viewStudent', name:'viewStudent', component: ViewStudent },


  // Add other routes here as needed
  // Example: 
  // Uncomment the following lines if you have an Auth component and Dashboard component
  // {path: '/user/:id', name: 'User',  component: UserProfile} 
  // { path: '/auth', name:'auth', component: Auth },
  // { path: '/dashboard', name:'home', component: Dashboard },
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
