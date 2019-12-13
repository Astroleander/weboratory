<template>
  <article class="fullscreen">
    <section class="float right">
      <button @click="changeWireFrame()"> WireFrame </button>
      <button @click="changeDetail(1)"> + </button>
      <button @click="changeDetail(2)"> - </button>
    </section>
    <section class="float left group-button">
      <button v-for="material in Object.keys(material_list)" :key="material"
        @click="changeMaterial(material)">
        {{ material }}
      </button>
    </section>

    <div id="container"></div>
  </article>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const MATCAPS = require.context('@/res/assets/textures/matcaps', false, /\.png$|\.jpg$/, 'lazy').keys()
  .map(each => `src/res/assets/textures/matcaps${each.slice(1)}`);
console.log(MATCAPS)

/**
 * 🚀 Speed
 * Lambert > Phong > standard >= physical
 * 
 * 🔑 @name BasicMaterial
 *    纯色 shading
 * 🔑 @name DepthMaterial
 *    按照远近着色, 默认 BasicDepthPacking, 近处为白色, 远处为黑色, 
 *    注意这个远近和 camera 的 far, near 值相关, 过远的 far 会导致全黑
 * 🔑 @name DistanceMaterial
 *    "间隔/距离" 的意思是指能够准确衡量的那些有间隔的贴图, 
 *    例如一个有透明带的球体, 用 Distance 包装后光才能准确穿过这些缝隙构造出阴影, 
 *    否则一般的材质只能构造整个的阴影
 * 🔑 @name LambertMaterial
 *    非高光材质
 *    使用 Lambertian 计算反射率, 使用 Gouraud 着色方法
 * 🔑 @name MatcapMaterial
 *    MatCap 预制贴图
 *    最大特点是不受光照影响
 * 🔑 @name NormalMaterial
 *    默认五彩斑斓的 RGB
 * 🔑 @name PhongMaterial
 *    高光、光滑材质
 *    使用非物理的 Blinn-Phong 模型计算反射率, 使用 Phong 材质模型
 * 🔑 @name PhysicalMaterial
 *    相较于 Standard 允许更自由地控制反射率
 *    配合 envmap 使用为上策
 * 🔑 @name StandardMaterial
 *    许多 3D 应用的标准都是 PBR (Physically based rendering)
 *    相较于过去使材质在特别的光照下才能表现不错的状况,  physical 材质试图在所有光照都场景下都能表现出"正确的"光照
 *    Physical 材质能创造更精确和真实的视觉效果, 同时也消耗了更多的性能
 *    使用和 Phong 一样的着色方法, 比 Gouraud 准确
 *    配合 envmap 使用为上策
 * 🔑 @name ToonMaterial
 *    使用 toon 着色器的 PhongMaterial
 * 🔑 @name SpriteMaterial
 *    A material for a use with a Sprite.
 *    SpriteMaterial 作用于 Sprite 而不是 Geometry 上, 在此页面不演示
 * 
 * https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial
 */
export default {
  data: function() {
    return {
      camera: null,
      scene: null,
      renderer: null,

      detail: 1,
      mesh: null,
      matcaps: [],
      distance: null,
      /**
       * 对象返回函数, 将实例化过程延迟到加载
       */
      material_list: {
        /**@name ToonMaterial
         * @description 
         * 💊 An extension of the MeshPhongMaterial 
         * 💊 with toon shading
         */
        Toon: () => new THREE.MeshToonMaterial(),
        /**@name BasicMaterial
         * @description 
         * 💊 simply shaded
         */
        Basic: () => new THREE.MeshBasicMaterial(),
        BasicTexture: () => new        THREE.MeshBasicMaterial({
          alphaMap: this.distance.alphaMap,
          alphaTest: this.distance.alphaTest,
          side: THREE.DoubleSide
        }),
        Standard: () => new THREE.MeshStandardMaterial(),
        /**@name PhysicalMaterial
         * @description
         * 💊 An extension of the MeshStandardMaterial that allow for greater control over reflectivity
         * 💊 Specify an environment map for best results
         */
        Physical: () => new THREE.MeshPhysicalMaterial({
          roughness: 0,
          metalness: 0,
          reflectivity: 1,
          clearcoat: 1,
          clearcoatRoughness: 1,
          color: new THREE.Color(0x2194ce)
        }),
        /**@name PhongMaterial
         * @description
         * 💊 Non-physically based Blinn-Phong model for calculating reflectance
         * 💊 Using a Phong shading model. Standard & physical also use this model
         * 💊 Performance will generally be greater when using this material over the MeshStandardMaterial or MeshPhysicalMaterial, at the cost of some graphical accuracy.
         */
        Phong: () => new THREE.MeshPhongMaterial(),
        /**@name DepthMaterial
         * @description A material for drawing geometry by Depth.
         *              Depth is based off of the camera near and far plane.
         *              White  is nearest, black is farthest.
         */
        DepthBasic: () => new THREE.MeshDepthMaterial({
          depthPacking: THREE.BasicDepthPacking
        }),
        DepthRGBA: () => new THREE.MeshDepthMaterial({
          depthPacking: THREE.RGBADepthPacking
        }),
        /**@name LambertMaterial
         * @description A material for non-shiny surfaces, without specular highlights
         * Due to the simplicity of the reflectance and illumination models, performance will be greater when using this material over the Phong, Standard, Physical Material
         */
        Lambert: () => new THREE.MeshLambertMaterial(),
        /**@name MatCapMaterial
         * @description MeshMatcapMaterial is deifined by a Matcap (or Lit Sphere) texture, which encodes the material color and shading.
         * 💊 does not respond to lights since the matcap image file encodes baked lighting.
         * 💊 cast shadow
         * 💊 will not self-shadow or receive shadow
         */
        Matcap: () => new THREE.MeshMatcapMaterial({
          matcap: this.matcaps[~~(this.matcaps.length * Math.random())]
        }),
        /**@name NormalMaterial
         * @description A material that maps the normal vectors to RGB colors
         */
        Normal: () => new THREE.MeshNormalMaterial(),
        /**@name DistanceMaterial
         * @description MeshDistanceMaterial is
         * 💊 internally used for implementing shadow mapping with PointLights.
         * 💊 uesd to customize the shadow casting of an object assign an instance of MeshDistance
         *
         * ❌ 用于确保生产正确的阴影, 在这个例子里没有体现
         */
        Distance: () => this.distance,
        PhongFlatShading: () => new THREE.MeshPhongMaterial({
          flatShading: true
        }),
        NormalFlatShading: () => new THREE.MeshNormalMaterial({
          flatShading: true
        }),
        StandardFlatShading: () => new THREE.MeshStandardMaterial({
          flatShading: true
        }),
        MatcapFlatShading: () => new THREE.MeshMatcapMaterial({
          matcap: this.matcaps[~~(this.matcaps.length * Math.random())],
          flatShading: true
        }),
        PhysicalFlatShading: () => new THREE.MeshPhysicalMaterial({
          flatShading: true,
          roughness: 0,
          metalness: 0,
          reflectivity: 1,
          clearcoat: 1,
          clearcoatRoughness: 1,
          color: new THREE.Color(0x2194ce)
        }),
        ToonFlatShading: () => new THREE.MeshToonMaterial({
          flatShading: true,
        }),
        DepthFlatShading: () => new THREE.MeshDepthMaterial({
          flatShading: true,
          depthPacking: THREE.BasicDepthPacking
        }),
        LambertFlatShading: () => new THREE.MeshLambertMaterial({
          flatShading: true
        }),
      }
    }
  },
  mounted: function() {
    this.initWebGLCanvas();

    let geometry = new THREE.OctahedronBufferGeometry(100, this.detail);
    let material = new THREE.MeshToonMaterial();
    material.needsUpdate = true;
    let mesh = new THREE.Mesh(geometry, material);
    this.mesh = mesh;
    this.scene.add(mesh);
    this.render();
    this.getMatcaps();
    this.getDistance();
  },
  methods: {
    getDistance() {
      let texture = new THREE.CanvasTexture((()=>{
        let canvas = document.createElement('canvas');
        canvas.width = 2;
        canvas.height = 2;
        let context = canvas.getContext('2d');
        context.fillStyle = 'white';
        context.fillRect(0, 1, 2, 1);
        return canvas
      })());
      texture.magFilter = THREE.NearestFilter;
      texture.wrapT = THREE.RepeatWrapping;
      texture.wrapS = THREE.RepeatWrapping;
      texture.repeat.set(1, 4.5);

      let material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        alphaMap: texture,
        alphaTest: 0.5
      })
      this.distance = material;
    },
    async getMatcaps() {
      let manager = new THREE.LoadingManager(this.render);
      let loader = new THREE.TextureLoader(manager);
      MATCAPS.forEach(path => {
        let matcap = loader.load(path, () => {
          matcap.encoding = THREE.sRGBEncoding;
        })
        this.matcaps.push(matcap);
      })
    },
    initWebGLCanvas() {
      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      })
      this.renderer.setSize(innerWidth, innerHeight);
      let el = document.getElementById('container');
      el.appendChild(this.renderer.domElement);

      let fov = 45, aspect = window.innerWidth / window.innerHeight, near = 150, far = 1200;
      this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      this.camera.position.set(400, -200, 400);
      new OrbitControls(this.camera, this.renderer.domElement);

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x333333);
      let ambientLight = new THREE.AmbientLight(0x33eeff, 0.2);
      this.scene.add(ambientLight);
      let spotLight = new THREE.SpotLight(0xffffff);
      spotLight.position.set(400, 200, 400);
      spotLight.lookAt(new THREE.Vector3(0, 0, 0));
      this.scene.add(spotLight);
    },
    changeDetail(to) {
      to === 2 ?  (this.detail > -1 ? this.detail --  : '') : (this.detail < 5 ? this.detail++ : '');
      let geometry = new THREE.OctahedronBufferGeometry(100, this.detail);
      this.scene.remove(this.mesh);
      let material = this.mesh.material;
      let mesh = new THREE.Mesh(geometry, material);
      this.mesh = mesh;
      this.scene.add(this.mesh);
    },
    changeMaterial(type) {
      let wiretemp = this.mesh.material.wireframe;
      this.mesh.material = this.material_list[type]();
      switch (type) {
        case 'Distance':
          let distance = new THREE.MeshDistanceMaterial({
            alphaMap: this.distance.alphaMap,
            alphaTest: this.distance.alphaTest
          });
          this.mesh.customDistanceMaterial = distance;
          break;
        case 'Matcap':
          console.log('matcap does not support wireframe');
          /**
           * 其实能画出来, 但是似乎是有内存泄漏的问题
           */
          break;
        default:
          this.mesh.material.wireframe = wiretemp;
          break;
      }
    },
    changeWireFrame() {
      if(!this.mesh.material.isMeshMatcapMaterial) this.mesh.material.wireframe = !this.mesh.material.wireframe
    },
    render() {
      requestAnimationFrame(this.animate);
    },
    animate(time) {
      /** 
       * 参数 time, 是一个时间戳, DOMHighResTimeStamp
       * 指示了从 requestAnimationFrame() 第一次开始执行回调开始的时间
       */
      let f = 0.05 * Math.sin(2 * Math.PI / 20000 * time) 
      this.mesh.rotateX(f);
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
    }

  }
}
</script>

<style lang="scss" scoped>
button {
  padding: 5px 20px;
  font-size: 1em;
}
.group-button {
  height: 95%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 50%;
  button {
    background: transparent;
    color: wheat;
    margin: 2px;
  }
}
</style>

<style>

</style>