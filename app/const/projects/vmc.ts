import { ELevelProject, EStatusProject } from "~/types/enum/project/project";
import type { TProject } from "~/types/type/project";

export const vmc: TProject = {
  id: 'dpfojkdfg',
  name: 'ValueMyCar',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales neque at velit blandit, vitae semper lacus dignissim. Phasellus tempor, nunc in bibendum posuere, ipsum justo mattis sapien, ac laoreet neque lacus at risus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla facilisi. Fusce viverra, ligula eget porta feugiat, velit leo suscipit magna, eu luctus mauris ipsum ut sem. Aenean nec dui nisl. Maecenas eget vestibulum felis, sit amet sagittis est.',
  status: EStatusProject.PROFESSIONAL,
  level: ELevelProject.HIGHT,
  duration: '3 years',
  tech: [
    { url: 'https://vuejs.org/', icon: '/images/small/nuxt.png' },
    { url: 'https://vuejs.org/', icon: '/images/small/Sass.png' },
    { url: 'https://nuxt.com/', icon: '/images/small/TypeScript.png' },
    { url: 'https://nuxt.com/', icon: '/images/small/Yarn.png' },
    { url: 'https://nuxt.com/', icon: '/images/small/Docker.png' },
    { url: 'https://nuxt.com/', icon: '/images/small/MongoDB.png' },
    { url: 'https://nuxt.com/', icon: '/images/small/Git.png' },
    { url: 'https://nuxt.com/', icon: '/images/small/GitLab.png' }
  ],
  picture: {
    src_s: "",
    src_m: "/images/medium/vmc-mobile.png",
    src_l: ["/images/large/vmc/vmc-desktop.png"],
    alt: 'Capture d’écran du projet valuemycar mobile'
  },
  links: {
    code: '',
    website: 'https://valuemycar.fr/',
  }
}
