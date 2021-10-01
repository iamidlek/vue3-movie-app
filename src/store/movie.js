import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the Movie title!'

export default {
  // 모듈화 된다는것을 명시적으로 표현
  namespaced: true,
  // 취급해야하는 데이터
  state: function () {
    return{
      movies: [],
      message: _defaultMessage,
      loading: false,
      theMovie: {}
    }
  },
  // 화살표 함수 축약형
  // state: () => ({ movies: []})

  // computed 계산된 데이터
  getters: {
    // movieIds라는 배열이 계산된 상태로 있음
    // movieIds(state) {
    //   return state.movies.map(m => m.imdbID)
    // }
  },
  // methods!
    // 변이 관리하는 `데이터` 내용 변경 가능
  mutations:{
    // 개별 갱신
    // assignMovies (state, Search) {
    //   state.movies = Search
    // },
    updateState(state, payload) {
       // ['movies','message','loading']
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })

    },
    resetMovies(state) {
      state.movies = []
      state.message =_defaultMessage
      state.loading =false
    }
  },
    // 직접적으로 데이터를 수정할 수 없음
    // 비동기 동작
  actions:{
    // searchMovies( { state, getters, commit }){
      // 객체 분해 해서 가져오거나 
      // context를 매개변수로 사용해서 가져오기 가능
      // context.state
      // context.getters
      // context.commit (mutations) 활용가능
    // }

    // payload는 함수 실행시 들어오는 인자
    // async searchMovies (context, payload) {
    async searchMovies ({ commit, state }, payload) {
      // 가지고 오는 중이면 실행 안됨
      if (state.loading) return
      
      commit('updateState', {
        message: '',
        loading: true
      })
      
      try {
        const res = await _fetchMovie({
          ...payload, 
          page: 1
        })
        const { Search, totalResults } = res.data
        // context.commit('assignMovies', Search)
        // context.commit('updateState', {
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID'),
          // message: 'hello',
          // loading: true
        })
        
        // 총 검색 수 string으로 넘어옴
        const total = parseInt(totalResults, 10)
        // 올림 처리
        const pageLength = Math.ceil(total / 10)
  
        // 추가 요청
        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page++) {
            // 최대 페이지 설정한 부분
            if (page > (payload.number / 10 )) break
  
            const res = await _fetchMovie({
              ...payload,
              page
            })
            const { Search } = res.data
            commit('updateState', {
              movies: [
                ...state.movies, 
                ..._uniqBy(Search,'imdbID')]
            })
          }
        }
      } catch (message) {
        commit('updateState', {
          movies: [],
          message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    // context 구조분해 { state, commit }
    async searchMovieWithID ({ state, commit }, payload) {
      if (state.loading) return

      commit('updateState', {
        theMovie: {},
        loading: true
      })
      try {
        const res = await _fetchMovie(payload)
        commit('updateState', {
          theMovie: res.data
        })
      } catch (err) {
        commit('updateState', {
          theMovie: {}
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
}


function _fetchMovie(payload) {
  const { title, type, year, page, id } =payload 
  const OMDB_API_KEY = '7035c60c'
  // 단일, 여러
  const url = id 
  ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
  : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(res => {
        // 잘못된 요청을 보내도 응답이 오는 경우(응답 내부에 에러)
        if (res.data.Error) {
          reject(res.data.Error)
        }
        resolve(res)
      })
      .catch(err => {
        reject(err.message)
      })
  })
}
