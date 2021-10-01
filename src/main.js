import { createApp } from 'vue'
import App from './App'

// index.js는 생략해도 알아서 가져옴
// 새로운 폴더에 index.js로 만들면 편함
import store from './store'
// import router from './routes/index.js'
import router from './routes'
// import store from './store/index.js'
import loadImage from './plugins/loadImage'
// import '~/scss/style.scss'


createApp(App)
  .use(store)
  .use(router)
  .use(loadImage)
  .mount('#app')
