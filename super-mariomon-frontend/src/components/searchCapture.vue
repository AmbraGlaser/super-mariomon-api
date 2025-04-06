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

  
      <div v-if="foutmelding" class="text-red-400 flex items-center gap-2">
        <span class="text-2xl">❌</span>
        <span>Geen capture gevonden.</span>
      </div>
  
      <div v-if="gevondenCapture" class="bg-zinc-800 p-6 rounded shadow w-96 text-center">
        <h2 class="text-xl font-bold">{{ gevondenCapture.naam }}</h2>
        <p>Dex #: {{ gevondenCapture.dexNumber }}</p>
        <p>Type: {{ gevondenCapture.type1 }}{{ gevondenCapture.type2 ? ' / ' + gevondenCapture.type2 : '' }}</p>
        <p>HP: {{ gevondenCapture.HP }} | Atk: {{ gevondenCapture.Atk }} | Spe: {{ gevondenCapture.Spe }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  
  const zoekTerm = ref('')
  const gevondenCapture = ref(null)
  const foutmelding = ref(false)
  
  const zoekCapture = async () => {
    foutmelding.value = false
    gevondenCapture.value = null
  
    try {
      const response = await axios.get('http://localhost:3000/api/captures')
      const zoek = zoekTerm.value.toLowerCase()
  
      const found = response.data.find(
        capture =>
          capture.naam.toLowerCase().includes(zoek) || capture.dexNumber === Number(zoek)
      )
  
      if (found) {
        gevondenCapture.value = found
      } else {
        foutmelding.value = true
      }
    } catch (err) {
      foutmelding.value = true
      console.error(err)
    }
  }
  </script>
  