import { ELevelProject, EStatusProject } from "~/types/enum/project/project";
import type { TProject } from "~/types/type/project";

export const kaza: TProject = {
  id: 'pazfouherl',
  name: 'Kaza',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porta sit amet justo nec rhoncus. Vivamus id diam sed ante euismod tincidunt. Pellentesque non orci malesuada, pharetra nunc vel, consequat mauris. In hac habitasse platea dictumst. Donec eu magna sed ligula tristique commodo. Cras aliquet magna id ex sodales, et scelerisque purus bibendum. Nam fermentum metus ut sem venenatis cursus.',
  status: EStatusProject.EXERCIES,
  level: ELevelProject.MEDIUM,
  duration: '3 weeks',
  tech: [
    { url: 'https://vuejs.org/', icon: '/images/small/React.png' },
    { url: 'https://vuejs.org/', icon: '/images/small/Sass.png' },
    { url: 'https://nuxt.com/', icon: '/images/small/JavaScript.png' },
    { url: 'https://nuxt.com/', icon: '/images/small/Git.png' },
    { url: 'https://nuxt.com/', icon: '/images/small/GitHub.png' }
  ],
  picture: {
    src_s: "",
    src_m: "/images/medium/kaza-mobile.png",
    src_l: ["/images/large/kaza/kaza-desktop.png"],
    alt: 'Capture d’écran du projet Kaza mobile'
  },
  links: {
    code: 'https://github.com/RominM/Kasa',
    website: 'https://kasa-rm.netlify.app/',
  }
}
