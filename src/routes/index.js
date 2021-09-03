import { createRouter, createWebHashHistory } from "vue-router";
import Home from './Home'
import About from './About'


export default createRouter({
  // hash, history 모드
  // 해쉬 모드 사용 .com/#/페이지
  history: createWebHashHistory(),
  routes:[
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      component: About
    },
    // {
    //   path: '/search',
    //   component: ''
    // }
  ]
})
