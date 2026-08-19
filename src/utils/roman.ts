const romanNumerals: Record<number, string> = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI',
}

export function getRomanNumeral(episodeId: number) {
  return romanNumerals[episodeId] ?? episodeId
}
