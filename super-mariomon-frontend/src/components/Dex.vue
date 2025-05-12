<template>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Super Mariomon Dex</h1>
      <div v-if="loading">Laden...</div>
      <div v-else class="space-y-4">
        <div
          v-for="capture in captures"
          :key="capture.id"
          class="border rounded-lg shadow p-4 bg-gray-900 text-white"
        >
          <!-- Klikbare naam in <h3> -->
          <h3
            @click="toggleOpen(capture.id)"
            class="cursor-pointer text-lg font-semibold hover:underline"
          >
            #{{ capture.dexNumber }} – {{ capture.naam }}
          </h3>
  
          <!-- Uitklapbare inhoud -->
          <div v-show="openId === capture.id" class="mt-2 space-y-1">
            <p><strong>Type:</strong> {{ capture.type1 }} <span v-if="capture.type2">/ {{ capture.type2 }}</span></p>
            <p><strong>Ability:</strong> {{ capture.ability1 }} <span v-if="capture.ability2">/ {{ capture.ability2 }}</span></p>
            <p><strong>Hidden Ability:</strong> {{ capture.hiddenability }}</p>
            <p><strong>Stats:</strong> HP {{ capture.HP }} / Atk {{ capture.Atk }} / Def {{ capture.Def }} / SpA {{ capture.SpA }} / SpD {{ capture.SpD }} / Spe {{ capture.Spe }}</p>
            <p><strong>BST:</strong> {{ capture.BST }}</p>
            <p><strong>Evolution:</strong> {{ capture.EvoCondition || '–' }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const API_URL = import.meta.env.VITE_API_BASE_URL
  const captures = ref([])
  const loading = ref(true)
  const openId = ref(null)
  
  function toggleOpen(id) {
    openId.value = openId.value === id ? null : id
  }
  
  onMounted(async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${API_URL}/api/captures`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      captures.value = response.data.sort((a, b) => parseInt(a.dexNumber) - parseInt(b.dexNumber))
    } catch (error) {
      console.error('Fout bij laden van captures:', error)
    } finally {
      loading.value = false
    }
  })
  </script>
  