<template>
  <article ref='container'></article>
</template>

<script>
import normal from '@/res/template/mixin.three.normal.js'
import * as THREE from 'three'

const CONFIG = {
  CUBE_LIMIT: 100,
  ELEVATION_LIMIT: 300,
  OPACITY_STEP: -0.02,
  FLOAT_STEP: 7,
  RANGE: 500,
}

function createCubes(num) {
  const cubes = [];
  for (let index = 0; index < num; index++) {
    cubes.push(createCube());
  }
  return cubes;
}
function createCube() {
  let len = 50 + Math.random() * 15;
  let geometry = new THREE.BoxBufferGeometry(len, len, len);
  let material = new THREE.MeshNormalMaterial({ transparent: true });
  let mesh = new THREE.Mesh(geometry, material);
  initCube(mesh);
  return mesh
}
function initCube(mesh) {
  mesh.position.set(
    -CONFIG.RANGE + Math.random() * CONFIG.RANGE * 2,
     -100, 
    -CONFIG.RANGE + Math.random() * CONFIG.RANGE * 2
  );
  mesh.rotation.set(Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI);
  return mesh
}

/** reset mesh for re-use */
function resetCube(mesh) {
  mesh.position.set(
    - CONFIG.RANGE + Math.random() * CONFIG.RANGE * 2,
    - 100, 
    - CONFIG.RANGE + Math.random() * CONFIG.RANGE * 2
  );
  mesh.rotation.set(Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI);
  mesh.material.opacity = 1;
  return mesh
}

export default {
  mixins: [normal],
  data() {
    return {
      cube_list: [],
    }
  },
  mounted() {
    this.setRenderTarget(this.$refs['container']);
    this.setStats(this.$refs['container']);
    this.setResizeListener(true);
    this.animate();
  },
  methods: {
    animate(t) {
      this.manageCubesCount(t);
      this.manageCubesBehavior(t);
      this.render();
      requestAnimationFrame(this.animate)
    },
    manageCubesCount(t) {
      if (CONFIG.CUBE_LIMIT < this.cube_list.length) return;
      
      let cubes = createCubes(~~(Math.random() * 3));
      cubes.forEach(cube => {
        this.scene.add(cube);
      });
      this.cube_list.push(...cubes);
    },
    manageCubesBehavior(t) {
      let cube;
      for (let index = 0; index < this.cube_list.length; index++) {
        cube = this.cube_list[index];
        if (cube.position.y > CONFIG.ELEVATION_LIMIT) {
          cube.material.opacity += CONFIG.OPACITY_STEP;
        } 
        /**
         * 对于满足消除条件的 cube, 进行回收
         */
        if (cube.material.opacity < 0) {
          resetCube(cube);
          continue;
        }
        cube.position.y += CONFIG.FLOAT_STEP;
      }
    },
  }
}
</script>

<style>

</style>