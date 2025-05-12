<template>
  <nav class="flex gap-4 justify-center my-4">
    <router-link to="/">🗂️ Dex</router-link>
    <router-link to="/search">🔍 Zoek</router-link>
    <router-link v-if="!loggedIn" to="/login">🔐 Login</router-link>
    <router-link v-if="!loggedIn" to="/register">📝 Registreer</router-link>
    <router-link v-if="loggedIn" to="/profile">👤 Profiel</router-link>
    <router-link v-if="loggedIn" to="/groups/create">➕ Groep maken</router-link>
    <button v-if="loggedIn" @click="handleLogout">🚪 Uitloggen</button>
  </nav>

  <router-view />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { isLoggedIn, logout } from './auth'

const loggedIn = ref(false)

onMounted(() => {
  loggedIn.value = isLoggedIn()
})

const handleLogout = () => {
  logout()
  loggedIn.value = false
  window.location.href = '/'
}
</script>
