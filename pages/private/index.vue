<template>
  <div class="private">
    <carousel>
      <list-project-cards :projects="mapCard" />
    </carousel>
  </div>
</template>

<script setup lang="ts">
import { ELevelProject, EStatusProject } from "~/types/enum/project/project";
import type { TmdbResponse } from "~/types/tmdb";
import type { TProject } from "~/types/type/project";

const { fetchTmdb } = useTmdb();

const { data: trending } = await useAsyncData("trending", () =>
  fetchTmdb<TmdbResponse>("/trending/movie/week", {
    include_adult: "true",
    page: "2",
  }),
);

const mapCard = computed<TProject[]>(() => {
  if (!trending.value?.results) return [];

  return trending.value.results.map((item) => ({
    id: String(item.id),
    name: item.title,
    description: item.overview,
    status: EStatusProject.EXERCIES,
    level: ELevelProject.MEDIUM,
    duration: item.release_date,
    tech: [],
    picture: {
      src_s: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
      src_m: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
      src_l: [
        `https://image.tmdb.org/t/p/w1280${item.backdrop_path}`,
        `https://image.tmdb.org/t/p/original${item.backdrop_path}`,
      ],
      alt: item.title,
    },
    links: {},
  }));
});

console.log(trending.value?.results);
</script>

<style scoped lang="scss">
.private {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #222222;
}

.fake-bento {
  display: flex;
  flex-direction: column;
  width: 750px;
  height: 100%;
}

.txt {
  color: #000;
}
</style>
