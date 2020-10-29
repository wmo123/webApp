import Vue from 'vue'
import Router from 'vue-router'
import Recommand from 'components/recommand'
import Rank from 'components/rank'
import Search from 'components/search'
import Singer from 'components/singer'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommand'
    },
    {
      path: '/recommand',
      name: 'Recommand',
      component: Recommand
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
