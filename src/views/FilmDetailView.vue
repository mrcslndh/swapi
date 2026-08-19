<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getFilmByEpisode } from '@/api/swapi'
import type { Film } from '@/types/swapi'
import { getRomanNumeral } from '@/utils/roman'

const route = useRoute()

const film = ref<Film | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const crawlParagraphs = computed(() =>
  film.value ? formatCrawl(film.value.opening_crawl).split('\n\n') : [],
)

function formatCrawl(text: string): string {
  return text
    .split(/\r\n\r\n/)
    .map((paragraph) => paragraph.replace(/\r\n/g, ' ').trim())
    .join('\n\n')
}

async function loadFilm(episodeId: number) {
  loading.value = true
  error.value = null
  film.value = null

  try {
    film.value = await getFilmByEpisode(episodeId)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Something went wrong'
  } finally {
    loading.value = false
  }
}

watch(
  () => route.params.episodeId,
  (episodeId) => {
    loadFilm(Number(episodeId))
  },
  { immediate: true },
)
</script>

<template>
  <main class="view-container film-detail">
    <RouterLink to="/films" class="back-button">← Back to films</RouterLink>
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">Something went wrong: {{ error }}</p>

    <article v-else-if="film">
      <h1>{{ film.title }}</h1>
      <p class="film__episode">Episode {{ getRomanNumeral(film.episode_id) }}</p>
      <p class="film__date">{{ film.release_date }}</p>
      <p>Director: {{ film.director }} · Producer: {{ film.producer }}</p>
      <div class="crawl">
        <p v-for="(paragraph, i) in crawlParagraphs" :key="i">{{ paragraph }}</p>
      </div>
    </article>
  </main>
</template>

<style scoped>
.back-button {
  display: inline-block;
  margin: 48px 0 16px 0;
  transition: color 0.5s ease;
}

.back-button:hover {
  color: #0a0a0a;
}

.crawl {
  margin-top: 32px;
  white-space: pre-wrap;
}

.film__date {
  margin: 8px 0 36px 0;
}

.film__episode {
  margin: 0 0 8px 0;
}

.film__episode,
.film__date {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
</style>
