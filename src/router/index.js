import Vue from 'vue'
import Router from 'vue-router'
import recommond from 'components/recommond/recommond'
import singer from 'components/singer/singer'
import rank from 'components/rank/rank'
import search from 'components/search/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/recommond'
    },
    {
      path:'/recommond',
      component:recommond
    },
    {
      path:'/singer',
      component:singer
    },
    {
      path:'/rank',
      component:rank
    },
    {
      path:'/search',
      component:search
    }
  ]
})
