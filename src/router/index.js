import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Graphs from '../components/Graphs'
import Currencies from '../components/Currencies'
import Currency from '../components/Currency'

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
      component: Graphs
    },
    {
      path: '/currencies',
      component: Currencies
    },
    {
      path: '/currency/:id',
      component: Currency
    }
  ],
  mode: 'history'
})
