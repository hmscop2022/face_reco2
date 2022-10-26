import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueKakaoSdk from 'vue-kakao-sdk'

const apiKey = '9cbc04374e678717832337c16fe86927'
Vue.use(VueKakaoSdk, {apiKey})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
