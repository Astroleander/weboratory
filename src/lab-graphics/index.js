console.log('[graphics][entry]', 'load ...');

import { createApp } from 'vue';

import router from './router';

import app from './AppGraphics.vue';

import './styles/common.scss'

console.log(router.getRoutes())
// window.router = router
createApp(app)
  .use(router)
  .mount('#laboratory-graphics');
