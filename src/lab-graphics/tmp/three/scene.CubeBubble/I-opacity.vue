<template>
  <article ref='container'></article>
</template>

<script>
import normal from '@/res/template/mixin.three.normal.js'
import * as THREE from 'three'

/**
 * 把独立的配置变量抽出到 CONFIG，这样只需要更改配置就可以改变图形生成模式。
 * 🆖注意这种方式依赖于对用户不可见的函数和控制条件，用户更改时其实并不知道参数如何作用于整个过程
 */
const CONFIG = {
  CUBE_LIMIT: 100,
  ELEVATION_LIMIT: 300,
  /**
   * 这样的 STEP 变量最大的问题在于
   * 1. 过程总是线性的
   * 2. 无法分段
   * 3. 过程隐藏在代码之中
   */
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
/**
 * 抽出 init 过程, 方便 reset 复用
 */
function initCube(mesh) {
  mesh.position.set(
    -CONFIG.RANGE + Math.random() * CONFIG.RANGE * 2,
     -100, 
    -CONFIG.RANGE + Math.random() * CONFIG.RANGE * 2
  );
  mesh.rotation.set(Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI);
  return mesh
}

/** not for this case */
function resetCube() {}

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
      /**
       * 步骤：
       * 1. 管理数量数组
       * 2. 管理数组中每个 Cube 的位置
       * 3. 渲染
       */
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
        /**
         * 这里就是被隐藏起来的变化函数
         */
        if (cube.position.y > CONFIG.ELEVATION_LIMIT) {
          cube.material.opacity += CONFIG.OPACITY_STEP;
        } 
        if (cube.material.opacity < 0) {
          this.scene.remove(cube);
          let index = this.cube_list.indexOf(cube);
          // console.log(index)

          if (index > -1) {
            this.cube_list.splice(index, 1);
          }
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