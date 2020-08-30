export function animateBubble() {
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

export function animateWater() {
  let p = document.getElementsByClassName('waterline-in-flask');
}

animateBubble();
animateWater();