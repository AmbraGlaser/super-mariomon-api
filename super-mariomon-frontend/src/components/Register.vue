<template>
    <div class="container">
      <h1 class="text-3xl font-bold">Registreren</h1>
      <form @submit.prevent="register">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Wachtwoord" required />
        <button type="submit">Registreer</button>
      </form>
  
      <p v-if="error" class="text-red-400">Fout: {{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  
  const email = ref('')
  const password = ref('')
  const error = ref(null)
  
  const register = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {
        email: email.value,
        password: password.value
      })
      error.value = null
      alert('Geregistreerd! Log nu in.')
    } catch (err) {
      error.value = err.response?.data?.error || 'Onbekende fout'
    }
  }
  </script>
  