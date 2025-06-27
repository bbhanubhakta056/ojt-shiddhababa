<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Student Data</h1>
  
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p class="mt-2">Loading student data...</p>
      </div>
      
      <!-- Error State -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
      </div>

        <!-- Data Display -->
      <div v-if="student" class="bg-white rounded-lg shadow p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 class="text-xl font-semibold mb-2">Student Information</h2>
            <table class="min-w-full border-collapse border border-gray-300">
            <thead class="bg-gray-100">
              <tr>
                <th class="border p-2">ID</th>
                <th class="border p-2">Name</th>
                <th class="border p-2">Class</th>
                <th class="border p-2">Username</th>
                <th class="border p-2">Address</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="students in student" :key="students.id">
                <td class="border p-2">{{ students.id }}</td>
                <td class="border p-2">{{ students.sname }}</td>
                <td class="border p-2">{{ students.sclass }}</td>
                <td class="border p-2">{{ students.username }}</td>
                <td class="border p-2">{{ students.saddress }}</td>
              </tr>
            </tbody>
          </table>
          </div>
          
          <!-- <div v-if="student.courses && student.courses.length">
            <h2 class="text-xl font-semibold mb-2">Enrolled Courses</h2>
            <ul class="list-disc pl-5 space-y-1">
              <li v-for="course in student.courses" :key="course.id">
                {{ course.name }} ({{ course.code }})
              </li>
            </ul>
          </div> -->
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'


//TODO: Define the interface for Student data structure
// This interface should match the structure of the student data returned by your API
interface Student {
  id: number;
  sname: string;
  sclass: string;
  g_phone: string;
  saddress: string;
  username: string;
}

const student = ref<Student[] | null>(null);

// const student = ref(null)
const loading = ref(false)
const error = ref('')

// Function to fetch student data from the API
const fetchStudentData = async () => {
  try {
    console.log('Fetched student data:')
    loading.value = true
    error.value = ''
    
    const response = await fetch('http://localhost:3000/api/get/student') // Adjust the URL as needed for your API endpoint
    
    //
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    student.value = data
  } catch (err) {
    error.value = 'Failed to fetch student data:' + (err as Error).message
  } finally {
    loading.value = false
  }
}

// Fetch student data when the component is mounted
onMounted(() => {
  fetchStudentData()
})

</script>