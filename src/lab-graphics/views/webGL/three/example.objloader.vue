<template>
  <article class='fullscreen' id='container'>
  </article>
</template>

<script>
import normal from '@/res/template/mixin.three.normal'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';

export default {
  mixins: [normal],
  mounted() {
    this.setRenderTarget(document.getElementById('container'));
    this.setResizeListener();
    this.loadObj();
  },
  methods: {
    loadObj() {
      const loader = new OBJLoader();
      loader.setPath('../src/res/assets/obj/');
      let m = new THREE.MeshNormalMaterial();
      loader.load('Queen.obj', (obj) => {
         obj.traverse( ( child ) => {
            if ( child instanceof THREE.Mesh ) {
                child.material = m;
            }
        } );
        this.scene.add(obj)
    })
    }
  }
}
</script>

<style>

</style>