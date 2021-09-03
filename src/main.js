import { createApp } from 'vue'
import App from './App'
import router from './routes/index.js'
// import '~/scss/style.scss'

createApp(App)
  .use(router)
  .mount('#app')
