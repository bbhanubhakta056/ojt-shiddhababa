<script setup>
  import { onMounted, ref } from 'vue'
  import { RouterView } from 'vue-router';
  import LoginPage from './components/pages/Login.vue'
  import Navigation from './components/pages/Navigation.vue'
  import Toast from './components/pages/Toast.vue';

  onMounted(() => {
    // Redirect to home after component mounts
    router.push('/home');
  });

</script>

<template>
  <Navigation /><br />
  <RouterView />
  <Toast/>
</template>

