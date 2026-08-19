<script setup lang="ts">
import filmsResponse from '@/data/films.json'

const films = [...filmsResponse.results].sort((a, b) => a.episode_id - b.episode_id)
</script>

<template>
  <main>
    <h1>Star Wars Films</h1>

    <ul>
      <li v-for="film in films" :key="film.episode_id">
        {{ film.title }}
      </li>
    </ul>
  </main>
</template>
