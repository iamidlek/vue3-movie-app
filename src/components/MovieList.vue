<template>
  <div class="container">
    <div class="inner">
      <MovieItem
        v-for="movie in movies"
        :key="movie.imdbID"
        :movie="movie" />
    </div>
  </div>
</template>

<script>
import MovieItem from '~/components/MovieItem';

export default {
  components: {
    MovieItem
  },
  // data() {
  //   return {
  //     movies: []
  //   }
  // }
  computed: {
    movies() {
      // 스토어 데이터 모듈 값 // 값의 반응성을 위해 computed에서 사용
      return this.$store.state.movie.movies
    }
  }
}
</script>
