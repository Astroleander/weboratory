<template>
  <article class='fullscreen' id='container'>
  </article>
</template>

<script>
import * as THREE from 'three'

import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'

const ARC_SEGMENTS = 200;
const LINE_INIT_COUNT = 8;
const LINE_COLOR = [0xff0000, 0x00ff00, 0x0000ff];
const box_geometry = new THREE.BoxBufferGeometry(20, 20, 20);

export default {
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,

      uniform: true,
      tension: 0.5,
      centripetal: true,
      chordal: true,

      splines: {},
      splineHelperObjects: [],
      positions: [],

      hiding: false,

      transformControl: null,
      stats: null,
      gui: null,
      dragControls: null,
    }
  },
  mounted() {
    this.initCanvas();
    this.initLight();
    this.initScene();
    this.renderer.render(this.scene, this.camera);
    // this.initUtils();
    // this.initCurves();
    // this.animate();
  },
  created() {

  },
  beforeUnmount() {
    this.gui.destroy()
  },
  methods: {
    initCanvas() {
      let width = window.innerWidth;
      let height = window.innerHeight;

      let fov = 60, aspect = width / height, near = 1, far = 10000;
      this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      // 不设置默认 position 的话 OrbitControls 不能用? 为什么
      this.camera.position.set(0, 1500, 200);

      this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio( window.devicePixelRatio );
      this.renderer.shadowMap.enabled = true;
      document.getElementById('container').appendChild(this.renderer.domElement);

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color( 0xf0f0f0 );
    },
    initLight() {
      let ambientLight = new THREE.AmbientLight(0xf0f0f0);
      this.scene.add(ambientLight);

      let spotLight = new THREE.SpotLight( 0xffffff, 1.5);
      spotLight.position.set(0, 1500, 200);
      spotLight.castShadow = true;
      let fov = 60;
      spotLight.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(fov, 1, 200, 2000 ));
      spotLight.shadow.bias = -0.000222;
      spotLight.shadow.mapSize.width = 1024;
      spotLight.shadow.mapSize.height = 1024;
      this.scene.add(spotLight);
    },
    initScene() {
      let planeGeometry = new THREE.PlaneBufferGeometry(2000, 2000);
      planeGeometry.rotateX( -Math.PI / 2);
      let planeMaterial = new THREE.ShadowMaterial({ opacity: 0.2 });
      let plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.position.y = -200;
      plane.receiveShadow = true;
      this.scene.add(plane);
      
      let helper = new THREE.GridHelper(2000, 100);
      helper.position.y = -199;
      helper.material.opacity = 0.25;
      helper.material.transparent = true;
      this.scene.add(helper);
    },
    initUtils() {
      this.stats = new Stats();
      document.getElementById('container').appendChild(this.stats.dom);

      let controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.damping = 0.2;
      controls.addEventListener('change', this.render);

      let gui = new GUI();
      gui.add(this, 'uniform').onChange(v => this.uniform = v).listen()
      gui.add(this, 'tension', 0, 1).step(0.01).listen().onChange(v => {
        this.splines.uniform.tension = v;
        this.updateSplineOutline();
      })
      gui.add(this, 'centripetal').listen()
      gui.add(this, 'chordal').listen()
      gui.add(this, 'addPoint').listen()
      gui.add(this, 'removePoint').listen()
      gui.add(this, 'exportSpline').listen()
      gui.open();

      let transformControl = new TransformControls(this.camera, this.renderer.domElement);
      transformControl.addEventListener( 'change', this.render );
      transformControl.addEventListener( 'dragging-changed', (event) => {
        controls.enabled = !event.value;
      });
      
      this.scene.add(transformControl);
      transformControl.addEventListener('change', () => {
        this.cancelHideTransform();
      })
      transformControl.addEventListener('mouseDown', () => {
        this.cancelHideTransform();
      })
      transformControl.addEventListener('mouseUp', () => {
        this.delayHideTransform();
      })
      transformControl.addEventListener('objectChange', () => {
        this.updateSplineOutline();
      })
      let dragControls = new DragControls(this.splineHelperObjects, this.camera, this.renderer.domElement);
      dragControls.enabled = false;
      dragControls.addEventListener('hoveron', (event) => {
        transformControl.attach(event.object);
        this.cancelHideTransform();
      })
      dragControls.addEventListener('hoveroff', () => {
        this.delayHideTransform();
      })

      this.transformControl = transformControl;
      this.gui = gui;
      this.dragControls = dragControls;
    },
    initCurves() {
      let length = LINE_INIT_COUNT;
      for (let i = 0; i < length; i++) {
        let obj = this.createSplineObject();
        this.positions.push(obj.position);
      }
      let geometry = new THREE.BufferGeometry();
      geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(ARC_SEGMENTS * 3), 3))

      let curve;
      curve = new THREE.CatmullRomCurve3(this.positions);
      curve.curveType = 'catmullrom';
      curve.mesh = new THREE.Line(geometry.clone(), new THREE.LineBasicMaterial({
        color: LINE_COLOR[0],
        opacity: 0.35,
      }));
      curve.mesh.castShadow = true;
      this.splines.uniform = curve;

      curve = new THREE.CatmullRomCurve3(this.positions);
      curve.curveType = 'centripetal';
      curve.mesh = new THREE.Line(geometry.clone(), new THREE.LineBasicMaterial({
        color: LINE_COLOR[1],
        opacity: 0.35
      }));
      curve.mesh.castShadow = true;
      this.splines.centripetal = curve;

      curve = new THREE.CatmullRomCurve3(this.positions);
      curve.curveType = 'chordal';
      curve.mesh = new THREE.Line(geometry.clone(), new THREE.LineBasicMaterial({
        color: LINE_COLOR[2],
        opacity: 0.35
      }));
      curve.mesh.castShadow = true;
      this.splines.chordal = curve;

      for (let i in this.splines) {
        console.log(this.splines[i]);
        this.scene.add(this.splines[i].mesh)
      }
      this.updateSplineOutline();
    },
    // 这种写法真的是很CPP....
    createSplineObject(position = {
      x: Math.random() * 1000 - 500,
      y: Math.random() * 600,
      z: Math.random() * 1000 - 500,
    }) {
      let material = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff});
      let object = new THREE.Mesh(box_geometry, material);
      object.position.x = position.x;
      object.position.y = position.y;
      object.position.z = position.z;
      object.castShadow = true;
      object.receiveShadow = true;
      this.splineHelperObjects.push(object);
      this.scene.add(object);
      return object;
    },
    delayHideTransform() {
      this.cancelHideTransform();
      this.hideTransform();
    },
    hideTransform() {
      this.hiding = setTimeout(() => {
        this.transformControl.detach(this.transformControl.object)
      })
    },
    cancelHideTransform() {
      if (this.hiding) clearTimeout(this.hiding);
    },
    updateSplineOutline() {
      let point = new THREE.Vector3();
      for (let i in this.splines) {
        let spline = this.splines[i];
        let splineMesh = spline.mesh;
        let splinePosition = splineMesh.geometry.attributes.position;

        for (let k = 0; k < ARC_SEGMENTS; k++) {
          let t = k / (ARC_SEGMENTS -1);
          spline.getPoint(t, point);
          splinePosition.setXYZ(k, point.x, point.y, point.z);
        }
        splinePosition.needsUpdate = true;
      }
    },
    render() {
      this.splines.uniform.mesh.visible = this.uniform;
      this.splines.centripetal.mesh.visible = this.centripetal;
      this.splines.chordal.mesh.visible = this.chordal;
      this.renderer.render(this.scene, this.camera);
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.stats.update();
      this.render();
    },
    addPoint() {
      this.positions.push(this.createSplineObject().position);
      this.updateSplineOutline();
    },
    removePoint() {
      if (this.positions.length < 4) return;
      this.positions.pop();
      this.scene.remove(this.splineHelperObjects.pop());
      this.updateSplineOutline();
    },
    exportSpline() {
      let strlist = [];
      this.positions.forEach(obj => {
        console.log(obj.x)
        strlist.push(`new THREE.Vector3(${obj.x},${obj.y},${obj.z})`);
      })
      console.log(strlist.join( ',\n' ));
      const code = '[' + ( strlist.join( ',\n\t' ) ) + ']';
      prompt('copy and paste code', code);
    }
  }
}
</script>

<style>

</style>