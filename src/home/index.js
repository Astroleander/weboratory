import './index.css';

/**
 * process.env 是可枚举的，但是在 Chrome 里并不会打印任何东西
 * [ future ] process 在 Webpack 5 中将被移除
 */
// if (process?.env?.NODE_ENV !== 'production') {
//   console.log('[home][index.js] Dev Mode!');
//   console.log(Object.getOwnPropertyDescriptors(process))
// }

/**
 * 
 */
animateBubble();
animateWater();
analyzeCatelog();

function animateBubble() {
  function animateFrameBubble() {
    let e = document.getElementsByClassName('bubble-in-flask')
    for (let index = 0; index < e.length; index++) {
      let el = e[index]
      let speed = 1 / el.r.baseVal.value
      // 30 差不多在瓶口
      el.cy.baseVal.value < 30 ?
      el.cy.baseVal.value = 100 
      :
      el.cy.baseVal.value -= speed
    }
    requestAnimationFrame(animateFrameBubble);
  }
  animateFrameBubble();
}

function animateWater() {
  let p = document.getElementsByClassName('waterline-in-flask');
}

function analyzeCatelog() {
  let catelogue = document.getElementById('catelogue')
  /** Provide by DefinePlugin */
  ENTRIES.forEach(name => {
    let el = document.createElement('a');
    el.classList.add('link');
    el.href = name;
    el.innerHTML = name.replace(/^\w*?-/, '').toUpperCase()
    catelogue.appendChild(el)
  })
}
