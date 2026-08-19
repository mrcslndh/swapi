<script setup lang="ts">
import type { Film } from '@/types/swapi'
import { getRomanNumeral } from '@/utils/roman'

defineProps<{
  film: Film
}>()
</script>

<template>
  <RouterLink :to="`/films/episode-${film.episode_id}`" class="film-card">
    <h2 class="film-card__title">
      {{ film.title }}
    </h2>

    <p class="film-card__episode">Episode {{ getRomanNumeral(film.episode_id) }}</p>

    <time class="film-card__date" :datetime="film.release_date">
      {{ film.release_date }}
    </time>
  </RouterLink>
</template>

<style scoped>
.film-card {
  background-color: #fff;
  border: 2px solid #777;
  border-radius: 12px;
  color: #0a0a0a;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 24px;
  text-decoration: none;
  transition: background-color 0.5s ease;
}

.film-card:hover {
  background-color: rgb(196, 204, 212);
}

.film-card:focus-visible {
  outline: 3px solid slategray;
}

.film-card__episode {
  margin: 0 0 8px 0;
}

.film-card__episode,
.film-card__date {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.film-card__title {
  margin: 0 0 16px 0;
}
</style>
