console.log('[graphics][entry]', 'load ...');

import Vue from 'vue';

import router from './router';
import app from './AppGraphics.vue';

import './styles/common.scss'

new Vue({
  el: '#laboratory-graphics',
  router,
  render: h => h(app)
});