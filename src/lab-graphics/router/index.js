import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import BaseLayout from '@graphics/layout/BaseLayout.vue'
import NavLayout from '@graphics/layout/NavLayout.vue'

import ViewRoutes from './view'

export const routes = [{
    path: '',
    component: NavLayout,
    redirect: 'app',
    children: [{
      name: 'app',
      path: 'app',
      component: () => import('../index.vue'),
      meta: {
        name: 'index'
      }
    }]
  },
  {
    path: '/views',
    component: BaseLayout,
    children: ViewRoutes
  }
]

export default new Router({
  // mode: 'history', // require server support
  scrollBehavior: () => ({
    y: 0
  }),
  routes,
})