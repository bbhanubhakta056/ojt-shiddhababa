<script setup>
  import { onMounted, ref } from 'vue'
  import { RouterView } from 'vue-router';
  import LoginPage from './components/pages/Login.vue'
  import Navigation from './components/pages/Navigation.vue'
  import Toast from './components/pages/Toast.vue';
  import router from './components/router/router'; // Import the router instance

  onMounted(() => {
    // This will run when the component is mounted
    router.push('/home'); // Redirect to home on mount
  });

</script>

<template>
  <Navigation /><br />  <!-- Navigation component for site navigation -->
  <RouterView /> <!-- RouterView to render the current route's component -->
  <Toast/> <!-- Toast component for displaying notifications -->
</template>

