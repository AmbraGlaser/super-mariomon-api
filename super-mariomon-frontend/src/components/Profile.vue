<template>
    <div class="container text-white">
      <h1 class="text-3xl font-bold">Mijn Profiel</h1>
  
      <div v-if="groups.length">
        <h2 class="text-xl mt-6">Mijn groepen</h2>
        <ul class="mt-2">
          <li v-for="group in groups" :key="group.id" class="border-b py-2">
            {{ group.name }} ({{ group.Captures?.length || 0 }} captures)
          </li>
        </ul>
      </div>
  
      <div v-else>
        <p class="text-gray-400 mt-6">Je hebt nog geen groepen aangemaakt.</p>
      </div>
    </div>
  </template>
  
  
  <script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const userId = ref(null)
const groups = ref([])

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (!token) return

  try {
    const decoded = jwtDecode(token)
    userId.value = decoded.userId

    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/groups?userId=${userId.value}`)
    groups.value = res.data
  } catch (err) {
    console.error("❌ Fout bij ophalen groepen:", err)
  }
})
</script>

  