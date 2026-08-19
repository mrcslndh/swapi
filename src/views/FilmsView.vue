<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getFilms } from '@/api/swapi'
import type { Film } from '@/types/swapi'
import FilmCard from '@/components/FilmCard.vue'

const films = ref<Film[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const result = await getFilms()
    films.value = [...result].sort((a, b) => a.episode_id - b.episode_id)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Something went wrong'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main class="films-view">
    <h1>Star Wars films</h1>

    <p v-if="loading">Loading...</p>
    <p v-else-if="error">Something went wrong: {{ error }}</p>

    <section v-else class="films">
      <FilmCard v-for="film in films" :key="film.episode_id" :film="film" />
    </section>
  </main>
</template>

<style scoped>
.films-view {
  max-width: 1080px;
  margin: 0 auto;
  padding: 32px;
}

.films {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

@media (max-width: 768px) {
  .films-view {
    padding-top: 8px;
  }
  .films {
    grid-template-columns: 1fr;
  }
}
</style>
