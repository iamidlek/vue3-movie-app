import { createApp } from 'vue'
import App from './App'
// import router from './routes/index.js'

// index.js는 생략해도 알아서 가져옴
// 새로운 폴더에 index.js로 만들면 편함
import router from './routes'
// import store from './store/index.js'
import store from './store'
// import '~/scss/style.scss'

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
