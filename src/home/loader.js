import Vue from 'vue';
import React from 'react';
import ReactDOM from 'react-dom';

export const svelteLoader = (Component, name) => {
  let Container = document.createElement('section');
  Container.id = name;
  new Component({
    target: Container
  });
  return Container;
};

export const vueLoader = (Component, name) => {
  let Container = document.createElement('section');
  Container.id = name;

  const app = new Vue({
    render: h => h(Component)
  }).$mount();

  Container.append(app.$el);
  return Container
}

export const reactLoader = (Component, name) => {
  let Container = document.createElement('section');
  Container.id = name;

  ReactDOM.render(<Component />, Container);
  return Container;
}

export const pureLoader = (Component, name) => {
  let Container = document.createElement('section');
  Container.style.height = '100%'
  return Component(Container);
}

export const loaderMapping = [
  [/\.svelte$/, svelteLoader],
  [/\.vue$/, vueLoader],
  [/\.[j|t]sx$/, reactLoader],
  [/\.js$/, pureLoader]
];
