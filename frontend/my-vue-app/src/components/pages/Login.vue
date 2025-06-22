<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 p-4">
    <div class="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8 space-y-6">
      <h2 class="text-2xl font-bold text-center text-blue-600">
        {{ isLogin ? 'Student Login' : 'Student Registration' }}
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <template v-if="!isLogin">
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Full Name</label>
              <input v-model="form.sname" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="e.g. Sita Thapa" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input type="date" v-model="form.dob" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Class</label>
              <input v-model="form.sclass" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="e.g. 8" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Address</label>
              <input v-model="form.saddress" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="e.g. Butwal" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Contact Number</label>
              <input v-model="form.g_phone" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="e.g. 9800000000" />
            </div>
                        <div>
              <label class="block text-sm font-medium text-gray-700">Guardians Name</label>
              <input v-model="form.g_name" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="e.g Sita Thapa" />
            </div>
          </div>
        </template>

        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Username</label>
            <input v-model="form.username" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="e.g. sita123" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Password</label>
            <div class="relative">
              <input :type="showPassword ? 'text' : 'password'" v-model="form.password" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                placeholder="••••••••" />
              <button type="button" @click="togglePassword"
                class="absolute right-2 top-2 text-gray-500 hover:text-gray-700">
                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-.723 2.396-2.598 4.437-4.542 5.542" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <button
          class="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300">
          {{ isLogin ? 'Login' : 'Register' }}
        </button>
      </form>

      <p class="text-center text-sm text-gray-600">
        {{ isLogin ? "Don't have an account?" : "Already registered?" }}
        <button @click="toggleForm" class="text-blue-600 hover:underline font-medium">
          {{ isLogin ? 'Register here' : 'Login here' }}
        </button>
      </p>
    </div>
    <!-- Toast Notification -->
    <div
        v-if="toast.show"
        :class="[
            'fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg transition-all duration-500',
            toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        ]"
        >
        {{ toast.message }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useToastStore } from '../../stores/toast';

const isLogin = ref(true)
const showPassword = ref(false)
const router = useRouter();
const toast = useToastStore();


// toast.trigger('Saved successfully!', 'success');
// toast.trigger('Something went wrong.', 'error');
// toast.trigger('Just a heads-up...', 'info');
// toast.trigger('Warning: check this out!', 'warning', 5000); // longer duration



const form = ref({
  sname: '',
  dob: '',
  sclass: '',
  saddress: '',
  g_phone: '',
  username: '',
  password: '',
})

function toggleForm() {
  isLogin.value = !isLogin.value
  form.value = {
    sname: '',
    dob: '',
    sclass: '',
    saddress: '',
    g_phone: '',
    username: '',
    password: '',
  }
}

function togglePassword() {
  showPassword.value = !showPassword.value
}

async function handleSubmit() {
    const url = isLogin.value ? 'http://localhost:3000/api/login' :'http://localhost:3000/api/add/student'
    console.log('hello world');
    try {
      
        console.log('login success1');
        const { data } = await axios.post(url, form.value)
        console.log('login success');
        toast.trigger(data.message || (isLogin.value ? 'Login successful' : 'Registered successfully'), 'success');
        router.push('/dashboard');
        // console.log(data)
    } catch (err) {
        console.error(err)
        console.log('login failed');
        toast.trigger('Something went wrong', 'error')
    }
}
</script>
