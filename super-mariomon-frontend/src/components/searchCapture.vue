<template>
  <div class="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center gap-6">
    <h1 class="text-5xl font-extrabold text-center">Zoek een <br />Capture</h1>

    <div class="search-container">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Naam of dexNumber"
      />
      <button @click="searchCapture">Zoek</button>
    </div>

    <div v-if="error" class="text-red-400 flex items-center gap-2">
      <span class="text-2xl">❌</span>
      <span>Geen capture gevonden.</span>
    </div>

    <div v-if="foundCapture" class="bg-zinc-800 p-6 rounded shadow w-96 text-center">
      <h2 class="text-xl font-bold">{{ foundCapture.naam }}</h2>
      <p>Dex #: {{ foundCapture.dexNumber }}</p>
      <p>Type: {{ foundCapture.type1 }}{{ foundCapture.type2 ? ' / ' + foundCapture.type2 : '' }}</p>
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

const API_URL = import.meta.env.VITE_API_BASE_URL

const searchCapture = async () => {
  error.value = false
  foundCapture.value = null

  try {
    const response = await axios.get(`${API_URL}/api/captures`)
    const search = searchTerm.value.toLowerCase()

    const found = response.data.find(
      capture =>
        capture.naam.toLowerCase().includes(search) ||
        capture.dexNumber === Number(search)
    )

    if (found) {
      foundCapture.value = found
    } else {
      error.value = true
    }
  } catch (err) {
    error.value = true
    console.error("Fout bij ophalen van captures:", err)
  }
}
</script>
