<template>
    <div class="container">
      <h1 class="text-3xl font-bold">Login</h1>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Wachtwoord" required />
        <button type="submit">Log in</button>
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
  
  const login = async () => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
      email: email.value,
      password: password.value
    })

    console.log("Login response:", res.data)
    localStorage.setItem('token', res.data.token)

    error.value = null
    alert('Ingelogd!')

    // tijdelijke redirect naar startpagina
    window.location.href = '/'
  } catch (err) {
    console.error("Login fout:", err)
    error.value = err.response?.data?.error || 'Onbekende fout'
  }
}

  </script>
  