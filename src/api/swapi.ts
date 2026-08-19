import type { Film } from '@/types/swapi'

const FILMS_URL = 'https://swapi.dev/api/films/?format=json'

let filmsCache: Film[] | null = null

export async function getFilms(): Promise<Film[]> {
  if (filmsCache) return filmsCache

  const response = await fetch(FILMS_URL)
  if (!response.ok) {
    throw new Error(`Failed to fetch films: ${response.status}`)
  }

  const data = await response.json()
  filmsCache = data.results
  return filmsCache!
}

export async function getFilmByEpisode(episodeId: number): Promise<Film> {
  const films = await getFilms()
  const film = films.find((f) => f.episode_id === episodeId)
  if (!film) {
    throw new Error(`Film with episode ${episodeId} not found`)
  }
  return film
}
