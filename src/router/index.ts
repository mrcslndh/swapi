import { createRouter, createWebHistory } from 'vue-router'
import FilmsView from '@/views/FilmsView.vue'
import FilmDetailView from '@/views/FilmDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/films',
    },
    {
      path: '/films',
      name: 'films',
      component: FilmsView,
    },
    {
      path: '/films/episode-:episodeId',
      name: 'film-detail',
      component: FilmDetailView,
    },
  ],
})

export default router
