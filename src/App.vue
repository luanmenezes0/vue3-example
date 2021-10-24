<script setup lang="ts">
import { computed, ref } from 'vue'

import repo from './components/Repo.vue'
import spinner from './components/Spinner.vue'
import useGetRepos from './services/useGetRepos'

const name = ref('')
const filter = ref('')

const { data, error, getRepos, loading } = useGetRepos()

const filteredRepos = computed(() => data.value.filter(re => re.name.includes(filter.value)))

</script>

<template>
  <main>
    <h1>Enter a Github organization</h1>
    <form @submit.prevent class="repo-form">
      <input type="text" placeholder="username" v-model="name" />
      <button @click="getRepos(name)">Search</button>
    </form>

    <section>
      <div class="error" v-if="error">{{ error }}</div>
      <spinner v-if="loading" />
      <div>
        <div class="search-form">
          <label for="filter">Filter by name</label>
          <input id="filter" type="text" v-model="filter" />
        </div>
        <div class="list">
          <repo v-for="repo in filteredRepos" :repository="repo" :key="repo.id"></repo>
        </div>
      </div>
    </section>
  </main>
</template>

<style>
main {
  display: grid;
  gap: 1rem;
}

.repo-form {
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

.list {
  display: grid;
  gap: 1rem;
}

.search-form {
  display: grid;
}
</style>
