import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const threeMixin = {
  created() {
    console.log(`[astroleander][modules.utils] Created by three-template-mixin at 'modules/utils/...'`);
  },
  mounted() {
    this._initCanvas();
  },
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      stats: null,
      temp_options: {
        AMBIENT_COLOR: 0xf0f0f0,
        BACKGROUND_COLOR: 0xf0f0f0,
        SPOTLIGHT_COLOR: 0xffffff,
        HORIZON: -200,
      } 
    };
  },
  methods: {
    // 把各个部分抽出来可以做成插件化的，可以但是没必要，以后有这个需求了再说
    _initCanvas() {
      let width = window.innerWidth, height = window.innerHeight;
      /** [Renderer] */
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.shadowMap.enabled = true;
      /** [Camera] */
      let fov = 60, aspect = width / height, near = 1, far = 10000;
      this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      this.camera.position.set(0, 800, 1000);

      /** [Scene] */
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(this.temp_options.BACKGROUND_COLOR);
      /** [Scene] init light */
      let ambientLight = new THREE.AmbientLight(this.temp_options.AMBIENT_COLOR);
      this.scene.add(ambientLight);
      let spotLight = new THREE.SpotLight(this.temp_options.SPOTLIGHT_COLOR, 1.5);
      spotLight.position.set(0, 1500, 200);
      spotLight.castShadow = true;
      spotLight.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(fov, 1, 100, 2000));
      spotLight.shadow.bias = -0.000222;
      spotLight.shadow.mapSize.width = 1024;
      spotLight.shadow.mapSize.height = 1024;
      this.scene.add(spotLight);
      /** [Scene] init plane */
      let planeGeometry = new THREE.PlaneBufferGeometry(2000, 2000);
      planeGeometry.rotateX(-Math.PI / 2);
      let planeMaterial = new THREE.ShadowMaterial({ opacity: 0.2 });
      let plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.position.y = this.temp_options.HORIZON;
      plane.receiveShadow = true;
      this.scene.add(plane);
      /** [Scene] init grid helper */
      let helper = new THREE.GridHelper(2000, 100);
      helper.position.y = this.temp_options.HORIZON;
      helper.material.opacity = 0.25;
      helper.material.transparent = true;
      this.scene.add(helper);

      /** [Controls] */
      let controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.damping = 0.2;
      controls.addEventListener('change', this.render);

      this.render();
    },
    setRenderTarget(target) {
      target.appendChild(this.renderer.domElement);
      this.render();
    },
    setStats(domElement) {
      this.stats = new Stats();
      domElement.appendChild(this.stats.dom);
    },
    render() {
      if(this.stats) { this.stats.update(); }
      this.renderer.render(this.scene, this.camera);
    }
  },
};

export default threeMixin;