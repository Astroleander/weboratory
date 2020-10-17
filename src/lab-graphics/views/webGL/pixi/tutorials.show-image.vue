<template>
  <article class="fullscreen" id="container" ref="containerRef"></article>
</template>

<script>
import * as PIXI from "pixi.js";
import reimu from '../../../../res/assets/images/reimu_01.jpg'
import { nextTick, onMounted, reactive, ref } from 'vue';

export default {
  setup() {
    const containerRef = ref(null);
    const size = reactive({
      x: 200,
      y: 400,
    })

    let app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight});
    onMounted(() => {
      size.x = window.innerWidth;
      size.y = window.innerHeight;
      containerRef.value.appendChild(app.view);

      const reimu = PIXI.Sprite.from('/src/res/assets/images/reimu_01.jpg');
      reimu.anchor.set(0.5);
      // move the sprite to the center of the screen
      reimu.x = app.screen.width / 2;
      reimu.y = app.screen.height / 2;

      app.stage.addChild(reimu);
    });
    return {
      size,
      containerRef,
      app
    }
  },
  mounted() {
    console.log(this)
  }
}
</script>

<style>

</style>