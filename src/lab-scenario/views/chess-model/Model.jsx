import React, { Component } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const shiftPosition = (start, end) => {
  return start / 2 + end / 2
}

class Model extends Component{
  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    this.initialCanvas(width, height);

  }
  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }
  initialCanvas(width, height) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 400);

    this.camera.position.y = -18;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))
    this.camera.rotation.z = -7 * Math.PI / 180;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setClearColor('#FFFFFF', 0);
    this.renderer.setSize(width, height);
    /** helper */
    // this.scene.add(new THREE.AxesHelper(1000));
    // this.scene.add(new THREE.GridHelper(1000, 100));
    this.renderScene();
    this.mount.appendChild(this.renderer.domElement);
    this.createModel().then(model => {
      this.scene.add(model)
      this.start();
    });

    /** controller */
    // let controls = new OrbitControls(this.camera, this.renderer.domElement);
    // controls.damping = 0.2;
    // controls.addEventListener('change', this.render);
  }
  getMatcaps() {
    const MATCAPS = require.context('@/res/assets/textures/matcaps', false, /\.png$|\.jpg$/, 'lazy').keys()
      .map(each => `src/res/assets/textures/matcaps${each.slice(1)}`);
    /** 使用 manager 可以触发回调 */
    // const manager = new THREE.LoadingManager(e => this.animate(this));
    // const loader = new THREE.TextureLoader(manager);
    /** 但是我们在预载 matcap texture 的时候并没有构建场景，所以不用了 */
    const loader = new THREE.TextureLoader();
    const matcap = loader.load(MATCAPS[6], () => {
      matcap.encoding = THREE.sRGBEncoding;
    })
    return matcap;
  }
  createModel(piecename = 'Queen.glb') {
    return new Promise(r => {
      /** material */
      let matcap = this.getMatcaps();
      this.material = new THREE.MeshMatcapMaterial({
        matcap,
        flatShading: false
      })
      /** mesh */
      let box;
      const loader = new GLTFLoader();
      loader.setPath('../src/res/assets/obj/');
      loader.load(piecename, (gltf) => {
        /** 
         * automate repositioning by 
         * using a bounding box to define a reasonable center, 
         * and then offset the mesh's position like so
         * @see https://stackoverflow.com/questions/28848863/threejs-how-to-rotate-around-objects-own-center-instead-of-world-center
         * 
         **/
        /** 创建 bound box */
        box = new THREE.Box3().setFromObject(gltf.scene);
        /** bound box */
        console.log(box)
        box.getCenter(gltf.scene.position);
        console.log(box)
        /** 点翻转 gltf.scene, 和原位置中心对称 */
        gltf.scene.position.multiplyScalar(-1);
        console.log(gltf.scene)
        // gltf.scene.position.set(
        //   -shiftPosition(box.min.x, box.max.x),
        //   -shiftPosition(box.min.y, box.max.y),
        //   -shiftPosition(box.min.z, box.max.z),
        // );
        gltf.scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = this.material;
          }
        });
        this.model = new THREE.Group();
        this.model.add(gltf.scene);
        r(this.model)
      })
    })
  }
  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(() => this.animate(this));
    }
  }
  stop() {
    cancelAnimationFrame(this.frameId);
  }
  animate(ctx) {
    this.model.rotation.z += 0.01
    ctx.renderScene();
    ctx.frameId = window.requestAnimationFrame(() => ctx.animate(ctx));
  }
  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div
        style={{ width: '400px', height: '600px' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}
export default Model