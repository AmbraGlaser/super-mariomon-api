<template>
    <div class="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center gap-8 px-4">
      <!-- Titel -->
      <h1 class="text-5xl font-extrabold text-center leading-snug">
        Zoek een <br />Capture
      </h1>
  
      <!-- Zoekveld en knop -->
      <div class="search-container">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Naam of dexNumber"
          class="px-4 py-2 flex rounded bg-zinc-800 border border-zinc-700 w-80 text-center"
        />
  
        <button
          @click="searchCapture"
          class="flex bg-black px-6 py-2 rounded hover:bg-zinc-800 transition"
        >
          Zoek
        </button>
      </div>
  
      <!-- Foutmelding -->
      <div v-if="error" class="text-red-400 flex items-center gap-2 mt-4">
        <span class="text-2xl">❌</span>
        <span>Geen capture gevonden.</span>
      </div>
  
      <!-- Resultaat -->
      <div
        v-if="foundCapture"
        class="bg-zinc-800 p-6 rounded shadow w-96 text-center mt-4 space-y-2"
      >
        <h2 class="text-xl font-bold">{{ foundCapture.naam }}</h2>
        <p>Dex #: {{ foundCapture.dexNumber }}</p>
        <p>
          Type: {{ foundCapture.type1 }}
          <span v-if="foundCapture.type2"> / {{ foundCapture.type2 }}</span>
        </p>
        <p>HP: {{ foundCapture.HP }} | Atk: {{ foundCapture.Atk }} | Spe: {{ foundCapture.Spe }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  
  const searchTerm = ref('')
  const foundCapture = ref(null)
  const error = ref(false)
  
  const searchCapture = async () => {
    error.value = false
    foundCapture.value = null
  
    try {
      const response = await axios.get('http://localhost:3000/api/captures')
      const search = searchTerm.value.toLowerCase()
  
      const found = response.data.find(
        capture =>
          capture.naam.toLowerCase().includes(search) || capture.dexNumber === Number(search)
      )
  
      if (found) {
        foundCapture.value = found
      } else {
        error.value = true
      }
    } catch (err) {
      error.value = true
      console.error(err)
    }
  }
  </script>
  