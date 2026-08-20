# Star Wars Films Explorer

A small Vue 3 + TypeScript application for browsing Star Wars films using SWAPI.

## What I prioritized

- A clean, focused core flow: **browse films → open a film → read its details**.
- Clear loading and error states on both the list and detail views.
- A responsive layout that works comfortably across desktop and mobile, using a two-column grid on larger screens and a single column on smaller screens.
- A focused desktop layout with a constrained content width rather than stretching the film cards across the entire viewport.
- Human-friendly URLs such as `/films/episode-4`, using the film's `episode_id` rather than exposing SWAPI's internal resource IDs.
- Films are displayed in episode order, while release dates are still shown as useful context.

## What I left out

- Related resources such as characters, planets and starships are left as the URLs provided by SWAPI. Resolving these into readable names would require additional requests and their own loading and error handling, which I considered outside the scope of the time box.
- No visual treatment for film imagery, since SWAPI does not provide images. I chose to lean into typography, spacing and structure rather than introduce arbitrary placeholder imagery.
- No state management library such as Pinia. With only two views and a relatively small amount of shared data, I felt that adding a state management library would introduce more complexity than value for this application.

## Technical / product decisions

**Technology choice.**  
I chose Vue 3 with TypeScript, partly because Vue is part of Stampen Media's existing technology stack and because I wanted to use Vue again.

**Reusing the film collection.**  
SWAPI's film list response already contains the full film objects needed by the application, so the detail view can find its film in the existing collection instead of making another network request. This also means navigating back to the film list does not require fetching the collection again.

**Using `episode_id` for application routing.**  
SWAPI's resource IDs and Star Wars episode numbers are different concepts. I chose URLs such as `/films/episode-4` because the episode number is meaningful to users and maps directly to the way the films are presented in the application, while avoiding exposing an implementation detail of the API.

**Using semantic links for film cards.**  
The entire film card is implemented as a `RouterLink` rather than a clickable generic element. This uses a real link for navigation instead of relying on a click handler, giving the film cards the expected browser and keyboard interaction of links.

**Responsive grid rather than full-width cards on desktop.**  
The film collection uses a constrained content width and a two-column grid on larger screens, changing to a single column on smaller screens. I chose this over full-width cards because the amount of information on each card is small, and limiting their width creates a more focused browsing experience.

## How I used AI

I used both Claude and ChatGPT during development, primarily as sounding boards for technical, UX and architectural decisions rather than as replacements for implementation.

AI was used throughout the development process to discuss architecture, implementation choices and debugging. I also used AI during development to challenge and refine decisions around routing, component structure, accessibility, responsive layout and CSS, and later to review and refine the README.

## What I'd improve with more time

- Resolve and display related resources such as characters, planets and starships as readable information.
- Replace the basic loading feedback with more polished skeleton loading states.
- Further refine the visual design and interaction details based on testing across more devices and viewport sizes.

## Something I'm a little proud of

SWAPI's `opening_crawl` field is formatted for the classic scrolling-text effect, with short deliberately broken lines. Rendering it directly in a `<pre>` preserves those line breaks, but produces an awkward reading experience when the text is displayed in a normal-width container.

I chose to parse the text into paragraphs instead — splitting on paragraph breaks and collapsing the shorter line breaks — so the opening crawl remains readable as normal running text while preserving its original content.

---

## Project Setup

This project was scaffolded with `npm create vue@latest` (Vue 3 + TypeScript + Vite).

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).
