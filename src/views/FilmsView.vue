<script setup lang="ts">
import filmsResponse from '@/data/films.json'
import FilmCard from '@/components/FilmCard.vue'

const films = [...filmsResponse.results].sort((a, b) => a.episode_id - b.episode_id)
</script>

<template>
  <main class="films-view">
    <h1>Star Wars films</h1>

    <section class="films">
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
