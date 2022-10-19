import Vue from 'vue'
import VueRouter from 'vue-router'
import Upload from '../components/upload/Upload.vue'
import Analysis from '../components/analysis/Analysis.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes : [
    {path:'/', component: Upload},
    {path:'/analysis', component: Analysis},
  ]
})

export default router
