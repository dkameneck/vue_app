import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Graphs from '../components/Graphs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      name: 'home'
    },
    {
      path: '/graphs',
      component: Graphs // ovo je glavna komponenta
    }
  ],
  mode: 'history'
})
