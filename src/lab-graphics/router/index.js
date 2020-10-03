import { createRouter, createWebHashHistory } from 'vue-router'

import BaseLayout from '@graphics/layout/BaseLayout.vue'
import NavLayout from '@graphics/layout/NavLayout.vue'

import ViewRoutes from './view'

console.log(ViewRoutes)
export const routes = [
  {
    path: '/views',
    component: BaseLayout,
    children: ViewRoutes
  },
  {
    path: '/',
    component: NavLayout,
    redirect: to => {
      console.log(to)
      return 'app'
    },
    children: [{
      path: 'app',
      component: () => import('../index.vue'),
      meta: {
        name: 'index'
      }
    }]
  }
]

const hash_mode = createWebHashHistory('/lab-graphics/')
export default createRouter({
  history: hash_mode,
  scrollBehavior: () => ({
    top: 0
  }),
  routes,
})