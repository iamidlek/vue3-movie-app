<template>
  <div class="container">
    <input
      v-model="title"
      class="form-control"
      type="text"
      placeholder="Search for Movies, Series & more"
      @keyup.enter="apply" />
    <div class="selects">
      <select
        v-for="filter in filters"
        v-model="$data[filter.name]" 
        :key="filter.name"
        class="form-select">
        <option
          v-if="filter.name === 'year'"
          value="">
          All Years
        </option>
        <option
          v-for="item in filter.items"
          :key="item">
          {{ item }}
        </option>
      </select>
    </div>
    <button
      class="btn btn-primary"
      @click="apply">
      Apply
    </button>
  </div>
</template>

<script>
// import axios from 'axios'
// $data = data()
// data.title data.type 는 data["title"] data["type"]  과 같다
export default {
  data(){
    return {
      title: '',
      type: 'movie',
      number: 10,
      year: '',
      filters:[
        {
          name: 'type',
          items: ['movie', 'series', 'episode']
        },
        {
          name: 'number',
          items: [10, 20, 30]
        },
        {
          name: 'year',
          items: (() => {
            const years = []
            const thisYear = new Date().getFullYear()
            for (let i = thisYear; i >= 1985; i -= 1) {
              years.push(i)
            }
            return years
          })()
        }
      ]
    }
  },
  methods: {
    async apply() {
      // async await 비동기 서버로 요청해서 내용 올때까지 기다림
      // const OMDB_API_KEY = '7035c60c'
      // const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${this.title}&type=${this.type}&y=${this.year}&page=1`)
      // console.log(res)

      // store의 mutaions 실행시에는 .commit()
      // acitons를 실행시에는 .dispatch()
      this.$store.dispatch('movie/searchMovies', {
        // 두번째 위치에 값들을 인자로 넘김
        title: this.title,
        type: this.type,
        number: this.number,
        year: this.year
      })
      // movie/searchMovies는 모듈에 설정한 movie라는 이름과 import된 파일 즉 movie.js의 내부 함수
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  > * {
    margin-right: 10px;
    font-size: 15px;
    &:last-child {
      margin-right: 0;
    }
  }
  .selects {
    display: flex;
    select {
      width: 120px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .btn {
    width: 120px;
    height: 50px;
    font-weight: 700;
    // 너비 감소 방지
    flex-shrink: 0;
  }
}
</style>
