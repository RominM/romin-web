import type { ELevelProject, EStatusProject } from "../enum/project/project"

export type TProject = {
  id: string
  name: string
  description: string
  status: EStatusProject
  level: ELevelProject
  duration: string
  tech: TTech[]
  picture: TPicture
  links: TProjectLinks
}

export type TProjectLinks = {
  code?: string,
  website: string,
}

export type TTech = {
  url: string
  icon: string
}

export type TPicture = {
  src_s: string
  src_m: string
  src_l: string[]
  alt: string
}
