<template>
  <article ref='container'></article>
</template>

<script>
import normal from '@/res/template/mixin.three.normal'
import * as THREE from 'three'

const CONFIG = {
  CUBE_LIMIT: 100,
  SIZE: 50,
  HORIZON_LIMIT: 3000,
  ELEVATION_LIMIT: 500,
  DEVIATION: 0.8,
  LIFE_CYCLE: 400,
  SCALE_LIMIT: 1,
  /** for throttle */
  RENDER_TIME_LIMIT: 1000 / 60,
  BUBBLE_TIME_LIMIT: 400,
}

function createCubes(num) {
  const cubes = [];
  for (let index = 0; index < num; index++) {
    cubes.push(createCube());
  }
  return cubes;
}

/**
 * 为了确保每次 cube 生成使用不同的随机种子, 我们只能在 mesh 里写变量，
 * TODO: 之后想一想这里怎么弄, 这这几个变量抽出去
 */
function createCube() {
  let len = CONFIG.SIZE + Math.random() * 15;
  let geometry = new THREE.BoxBufferGeometry(len, len, len);
  let material = new THREE.MeshNormalMaterial({ transparent: true });
  let mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.set(Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI);

  let scale_limit = Math.random() * CONFIG.SCALE_LIMIT;
  // let move_limit = CONFIG.HORIZON_LIMIT + (-0.5 + Math.random()) * CONFIG.HORIZON_LIMIT * CONFIG.DEVIATION;
  let lift_limit = CONFIG.ELEVATION_LIMIT + (-0.5 + Math.random()) * CONFIG.ELEVATION_LIMIT * CONFIG.DEVIATION;
  mesh.property = {
    deg: 2 * Math.PI * Math.random(),
    // x
    life: 0,
    // y
    scale_function: (x) => scale_limit * x / CONFIG.LIFE_CYCLE,
    elevate_function: (x) => lift_limit * x / CONFIG.LIFE_CYCLE, 
  }
  return mesh
}

/** reset mesh for re-use */
function resetCube(mesh) {
  mesh.rotation.set(Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI);
  mesh.property.life = 0;
  mesh.material.opacity = 0;
  mesh.scale.x = 1;
  mesh.scale.y = 1;
  mesh.scale.z = 1;
  mesh.position.set(0, - 100, 0);
  return mesh
}

export default {
  mixins: [normal],
  mounted() {
    this.setRenderTarget(this.$refs['container']);
    this.setStats(this.$refs['container']);
    this.setResizeListener();
    this.animate();
  },
  data() {
    return {
      cube_list: [],
      inRenderThrottle: false,
      inBubbleThrottle: false,
    }
  },
  methods: {
    animate(t) {
      /**
       * ⛔ 这里生动地展示了函数柯里化的必要性，展开的 throttle 函数会极大地干扰阅读
       */
      if (!this.inRenderThrottle) {
        this.inRenderThrottle = true;
        this.animateCubes(t);
        this.render();
        setTimeout(() => this.inRenderThrottle = false, CONFIG.RENDER_TIME_LIMIT)
      }
      requestAnimationFrame(this.animate);
    },
    animateCubes(t) {
      /** control the num of cubes */
      if (!this.inBubbleThrottle) {
        this.inBubbleThrottle = true;
        if (this.cube_list.length < CONFIG.CUBE_LIMIT) {
          let cubes = createCubes(1);
          cubes.forEach(cube => {
            this.scene.add(cube);
          });
          this.cube_list.push(...cubes);
        }
        setTimeout(() => this.inBubbleThrottle = false, CONFIG.BUBBLE_TIME_LIMIT)
      }
      /** control the size of cubes */
      /** control the existence of cubes */
      let cube;
      for (let index = 0; index < this.cube_list.length; index++) {
        cube = this.cube_list[index];
        if (cube.property.life < CONFIG.LIFE_CYCLE) {
          cube.material.opacity = 1;
          cube.scale.x = cube.property.scale_function(cube.property.life);
          cube.scale.y = cube.property.scale_function(cube.property.life);
          cube.scale.z = cube.property.scale_function(cube.property.life);
          cube.position.y = cube.property.elevate_function(cube.property.life);
          cube.position.x = cube.property.life / CONFIG.LIFE_CYCLE * CONFIG.HORIZON_LIMIT * Math.cos(cube.property.deg);
          cube.position.z = cube.property.life / CONFIG.LIFE_CYCLE * CONFIG.HORIZON_LIMIT * Math.sin(cube.property.deg);
          cube.property.life++;
        } else {
          resetCube(cube);
          continue;
        }
      }
    },
  }
}
</script>

<style>

</style>