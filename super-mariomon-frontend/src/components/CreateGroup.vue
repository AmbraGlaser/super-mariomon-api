<template>
    <div class="container text-white">
      <h1 class="text-2xl font-bold mb-4">Groep aanmaken</h1>
  
      <form @submit.prevent="maakGroep">
        <input v-model="name" placeholder="Groepsnaam" required class="mb-2 p-2 block w-full text-black" />
  
        <label class="block mb-2">Selecteer tot 6 Capture IDs (gescheiden met komma's)</label>
        <input v-model="rawIds" placeholder="Bijv: 1,3,5" required class="p-2 block w-full text-black" />
  
        <button type="submit" class="mt-4 bg-blue-600 px-4 py-2 rounded">➕ Maak groep aan</button>
      </form>
  
      <p v-if="feedback" class="mt-4 text-green-400">{{ feedback }}</p>
      <p v-if="error" class="mt-4 text-red-400">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  import { jwtDecode } from 'jwt-decode'
  
  const name = ref('')
  const rawIds = ref('')
  const feedback = ref('')
  const error = ref('')
  
  const maakGroep = async () => {
    feedback.value = ''
    error.value = ''
  
    try {
      const token = localStorage.getItem('token')
      const decoded = jwtDecode(token)
      const userId = decoded.userId
  
      const captureIds = rawIds.value
        .split(',')
        .map(id => parseInt(id.trim()))
        .filter(id => !isNaN(id))
  
      if (captureIds.length === 0 || captureIds.length > 6) {
        error.value = "Je moet tussen de 1 en 6 capture IDs opgeven."
        return
      }
  
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/groups`, {
        name: name.value,
        userId,
        captureIds
      })
  
      feedback.value = "✅ Groep succesvol aangemaakt!"
      name.value = ''
      rawIds.value = ''
    } catch (err) {
      error.value = err.response?.data?.error || "❌ Fout bij aanmaken groep"
    }
  }
  </script>
  