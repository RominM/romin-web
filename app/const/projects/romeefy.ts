import { ELevelProject, EStatusProject } from "~/types/enum/project/project";
import type { TProject } from "~/types/type/project";

export const rommefy: TProject = {
  id: 'qdsfsdff',
  name: 'Romeefy',
  description: 'I created a Spotify clone that replicates the music streaming experience with a modern and responsive interface. The project allows users to browse playlists, albums, and artists, search for tracks, manage their library, and control playback with an integrated player. The goal was to combine a polished design with interactive features to deliver a user experience similar to the original platform.',
  status: EStatusProject.PERSONAL,
  level: ELevelProject.HIGHT,
  duration: '2 months',
  tech: [
    { url: 'https://vuejs.org/', icon: '/images/small/nuxt.png' },
    { url: 'https://vuejs.org/', icon: '/images/small/Sass.png' },
    { url: 'https://nuxt.com/', icon: '/images/small/TypeScript.png' },
    { url: 'https://nuxt.com/', icon: '/images/small/Git.png' },
    { url: 'https://nuxt.com/', icon: '/images/small/GitHub.png' }
  ],
  picture: {
    src_s: "",
    src_m: "/images/medium/romeefy-mobile.png",
    src_l: [
      "/images/large/romeefy/romeefy-desktop_1.png",
      "/images/large/romeefy/romeefy-desktop_2.png",
      "/images/large/romeefy/romeefy-desktop_3.png",
      "/images/large/romeefy/romeefy-desktop_4.png"
    ],
    alt: 'Capture d’écran du projet romeefy'
  },
  links: {
    code: 'https://github.com/RominM/romeefy/tree/main',
    website: 'https://romeefy.netlify.app/',
  }
}
