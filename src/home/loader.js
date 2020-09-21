import Vue from 'vue';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const CommonLoader = (name) => {
  let Container = document.createElement('div');
  Container.id = `${name}-sample`;
  Container.style.height = '100%';
  return Container;
}

/**
 * For Type Loader
 * @param {type code} Component the export default file you writen in .xxx file
 * @param {string} name 
 */

export const svelteLoader = (Component, name) => {
  let Container = new CommonLoader(name);
  new Component({
    target: Container
  });
  return Container;
};

export const vueLoader = (Component, name) => {
  let Container = new CommonLoader(name);

  const app = new Vue({
    render: h => h(Component)
  }).$mount();

  Container.append(app.$el);
  return Container
}

export const reactLoader = (Component, name) => {
  let Container = new CommonLoader(name);

  ReactDOM.render(<Component />, Container);
  return Container;
}

export const pureLoader = (Component, name) => {
  let Container = new CommonLoader(name);
  return Component(Container);
}
 
export const externalImgLoader = (url, name) => {
  let Container = new CommonLoader(name);
  const img = document.createElement('img');
  img.src = url;
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = 'cover';
  Container.append(img)
  return Container
}

export const loaderMapping = [
  [/^http/, externalImgLoader],
  [/\.svelte$/, svelteLoader],
  [/\.vue$/, vueLoader],
  [/\.[j|t]sx$/, reactLoader],
  [/\.js$/, pureLoader],
];
