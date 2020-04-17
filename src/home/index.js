/**
 * 如果不设置入口文件的话,
 * webpack 会自动查找设置 ./src/index.js 作为入口文件，
 * 并在 ./dist/main.js 吐出 bundle,
 * 
 * 这是 webpack 4 的 zero configuration 特色，
 * 但是注意其只限于
 * 1. 默认入口 在 ./src/index.js
 * 2. 默认输出 到 ./dist/main.js
 * 3. 默认 production 和 development 模式
 * 
 * 👆 0 配置太傻了, 我们使用 /config 下的 webpack 配置指向各个入口
 */

import './index.css'
import './index.scss'
// TODO: process.env 似乎是不可枚举的?
if (process.env.NODE_ENV !== 'production') {
  console.log('[home][index.js] Dev Mode!')
}

animateBubble()
animateWater()

function animateBubble() {
  let e = document.getElementsByClassName('bubble-in-flask')
  for (let index = 0; index < e.length; index++) {
    let el = e[index]
    let speed = 1 / el.r.baseVal.value
    setInterval(() => {
      // 30 差不多在瓶口
      el.cy.baseVal.value < 30 ?
        el.cy.baseVal.value = 100 : el.cy.baseVal.value -= speed
    }, 10)

  }
}

function animateWater() {
  let p = document.getElementsByClassName('waterline-in-flask')
}

function analyzeCatelog(r) {
  let catelogue = document.getElementById('catelogue')
  r.keys().forEach(link => {
    let name = link.split('/')[1];
    if (name === 'home') return;
    let el = document.createElement('a');
    el.classList.add('link');
    el.href = name + '/';
    el.innerHTML = name.replace(/^\w*?-/, '').toUpperCase()
    catelogue.appendChild(el)
  });
}
analyzeCatelog(require.context('@/', true, /index.html$/, 'lazy'));
