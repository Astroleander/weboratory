<template>
  <article class="fullscreen" id="container" ref="container"></article>
</template>

<script>
import * as PIXI from "pixi.js";

const IMGPATH = ["../../../../../src/res/assets/images/star.png"];
const starTexture = PIXI.Texture.from(IMGPATH[0]);

const CONFIG = {
  starAmount: 1000,
  cameraZ: 0,
  fov: 20,
  baseSpeed: 0.025,
  speed: 0,
  wrapSpeed: 0,
  starStretch: 5,
  starBaseSize: 0.05,
};

const checkExplorer = () => {
  let type = "WebGL";
  if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
  }
  PIXI.utils.sayHello(type);
};
const randomizeStar = (star, initial) => {
  star.z = initial
    ? Math.random() * 2000
    : CONFIG.cameraZ + Math.random() * 1000 + 2000;

  /** Calculate star positions with radial random coordinate so no star hits the camera */
  const deg = Math.random() * Math.PI * 2;
  const distance = Math.random() * 50 + 1;
  star.x = Math.cos(deg) * distance;
  star.y = Math.sin(deg) * distance;
};
export default {
  created() {
    checkExplorer();
  },
  mounted() {
    this.initialPIXI();
    this.initialScene();
    this.updateScene();
    setInterval(() => {
      if (CONFIG.wrapSpeed > 0) {
        CONFIG.wrapSpeed = 0;
      } else {
        CONFIG.wrapSpeed = Math.random() * 2.5;
      }
    }, 3000);
  },
  data() {
    return {
      app: null,
      stars: [],
    };
  },
  methods: {
    initialPIXI() {
      let width = window.innerWidth,
        height = window.innerHeight;

      this.app = new PIXI.Application({
        width,
        height,
        antialias: true,
      });
      this.app.renderer.autoResize = true;
      this.app.renderer.backgroundColor = 0x061639;
      const container = document.getElementById("container");
      container.appendChild(this.app.view);
    },
    initialScene() {
      // create the stars
      for (let i = 0; i < CONFIG.starAmount; i++) {
        const star = {
          sprite: new PIXI.Sprite(starTexture),
          z: 0,
          x: 0,
          y: 0,
        };
        star.sprite.anchor.x = 0.5;
        star.sprite.anchor.y = 0.7;
        randomizeStar(star, true);
        this.app.stage.addChild(star.sprite);
        this.stars.push(star);
      }
    },
    updateScene() {
      /** listen for animate update */
      this.app.ticker.add((delta) => {
        /** simple easing. this should be changed to proper easing function when used for real */
        CONFIG.speed += (CONFIG.wrapSpeed - CONFIG.speed) / 20;
        CONFIG.cameraZ += delta * 10 * (CONFIG.speed + CONFIG.baseSpeed);
        for (let i = 0; i < CONFIG.starAmount; i++) {
          const star = this.stars[i];
          if (star.z < CONFIG.cameraZ) randomizeStar(star);

          /** map star 3d position to 2d */
          const z = star.z - CONFIG.cameraZ;
          star.sprite.x =
            star.x * (CONFIG.fov / z) * this.app.renderer.screen.width +
            this.app.renderer.screen.width / 2;

          star.sprite.y =
            star.y * (CONFIG.fov / z) * this.app.renderer.screen.width +
            this.app.renderer.screen.height / 2;

          /** calculate star scale & rotation */
          const dxCenter = star.sprite.x - this.app.renderer.screen.width / 2;
          const dyCenter = star.sprite.y - this.app.renderer.screen.height / 2;
          const distanceCenter = Math.sqrt(
            dxCenter * dxCenter + dyCenter * dyCenter
          );
          const distanceScale = Math.max(0, (2000 - z) / 2000);
          star.sprite.scale.x = distanceScale * CONFIG.starBaseSize;
          /** scale star on direction y depending on
           * 1. speed
           * 2. starStretch
           * 3. distance from center
           */
          star.sprite.scale.y =
            distanceScale * CONFIG.starBaseSize +
            (distanceScale *
              CONFIG.speed *
              CONFIG.starStretch *
              distanceCenter) /
              this.app.renderer.screen.width;
          /** fake trace made by y, we need to rotate it */
          star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
        }
      });
    },
  },
};
</script>

<style></style>
