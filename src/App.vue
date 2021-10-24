<script setup lang="ts">
import spinner from './components/Spinner.vue'
import { ref, onMounted } from 'vue'

const name = ref('')
const data = ref<{ name: string }[]>([])
const loading = ref(false)
const error = ref<string>('')

async function getRepos() {
  error.value = ''
  loading.value = true
  data.value = []

  try {
    const response = await fetch(`https://api.github.com/users/${name.value}/repos`)

    const result = await response.json()

    if (response.ok) {
      data.value = result
      error.value = ''
    } else {
      error.value = result.message
      data.value = []
    }
  } catch (err) {
    error.value = err.message
    data.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => console.log('moounteddd!'))

</script>

<template>
  <main>
    <h3>Enter Github username</h3>
    <form @submit.prevent>
      <input type="text" placeholder="username" v-model="name" />
      <button @click="getRepos">Press me</button>
    </form>

    <section>
      <spinner v-if="loading">loading...</spinner>
      <div class="error" v-if="error">{{ error }}</div>
      <ul>
        <li v-for="repo in data">{{ repo.name }}</li>
      </ul>
    </section>
  </main>
</template>

<style>
main {
  display: grid;
  gap: 1rem;
}

form {
  display: flex;
  gap: 1rem;
}
.error {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}

section {
  display: grid;
}
</style>
