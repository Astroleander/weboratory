<!--
  @author: Astroleander
  @created: 2019/08/27
  @origin/inspiration: null
  @description: Test Geometry
-->
<template>
  <article class='fullscreen' id='container'>
    <button class='float right' @click='toggleLines'>Wire Frame</button>
  </article>
</template>

<script>
import * as THREE from 'three'
import gridCalculator from '@/utils/layout/calculator.grid_auto'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const origin = new THREE.Vector3(0, 0, 0)

export default {
  data() {
    return {
      camera: null,
      size: 10,
      widthSegments: 5,
      heightSegments: 1,
      depthSegments: 1,
      geometries: [],
      meshes: [],
      studio: {},
      count: 0,
      wireframe: true,
      lines: []
    }
  },
  async mounted() {
    this.initRenderer();
    this.initCamera();
    this.initScene();

    /** 我们需要同步等待 promise 返回，否则字体 geometry 是延时的，不会被载入 */
    await this.invokeGeometries();
    this.buildStudio();
    this.locateGeometries();

    this.render();
  },
  methods: {
    async invokeGeometries() {
      this.geometries = [];
      let that = this
      /**
       * BoxBufferGeometry
       * width : Float,
       * height : Float,
       * depth : Float,
       * widthSegments : Integer,
       * heightSegments : Integer,
       * depthSegments : Integer
       */
      let box = new THREE.BoxBufferGeometry(this.size, this.size, this.size);
      this.geometries.push(box);

      /**
       * CircleBufferGeometry
       * radius : Float,
       * segments : Integer,
       * thetaStart : Float,
       * thetaLength : Float
       */
      let circle = new THREE.CircleBufferGeometry(this.size / 2);
      circle.rotation = true;
      this.geometries.push(circle);

      /**
       * SphereBufferGeometry
       * radius : Float, 
       * widthSegments : Integer, // Minimum value is 3, and the default is 8.
       * heightSegments : Integer, // Minimum value is 2, and the default is 6. 
       * phiStart : Float, 
       * phiLength : Float, 
       * thetaStart : Float, 
       * thetaLength : Float
       * phi 和 theta 是输入, 可以通过定义这两个值的范围来画扇面, 
       * 简单地看了一眼源代码, shpere 写的很像 parametric 
       */
      let sphere = new THREE.SphereBufferGeometry(this.size/2, 32, 24);
      this.geometries.push(sphere);

      /**
       * ConeBufferGeometry
       * radius : Float,
       * height : Float,
       * radialSegments : Integer,
       * heightSegments : Integer,
       * openEnded : Boolean,
       * thetaStart : Float,
       * thetaLength : Float
       */
      let cone = new THREE.ConeBufferGeometry(this.size / 2, this.size);
      this.geometries.push(cone);

      /**
       * CylinderBufferGeometry
       * radiusTop : Float,
       * radiusBottom : Float,
       * height : Float,
       * radialSegments : Integer,
       * heightSegments : Integer,
       * openEnded : Boolean,
       * thetaStart : Float,
       * thetaLength : Float
       */
      let cylinder = new THREE.CylinderBufferGeometry(this.size / 2, this.size / 2, this.size);
      this.geometries.push(cylinder);

      // shape 不拉伸, extrude 拉伸 (翻译成英语真的爆笑)
      let shape = new THREE.Shape();
      // 这玩意儿是平面的，只有 x 和 y
      shape.moveTo(0, this.size / 2);
      // shape.bezierCurveTo(0, 0, 0, 0, this.size / 2, 0);
      // shape.bezierCurveTo(0, 0, 0, 0, 0, -this.size / 2);
      // shape.bezierCurveTo(0, 0, 0, 0, -this.size / 2, 0);
      // shape.bezierCurveTo(0, 0, 0, 0, 0, this.size / 2);
      shape.lineTo(this.size / 2, this.size / 2);
      shape.lineTo(this.size / 2, 0);
      shape.lineTo(0, -this.size / 2);
      shape.lineTo(-this.size / 2, 0);
      shape.lineTo(0, this.size / 2);
      /**
      * ShapeBufferGeometry
      * shapes : Array
      * curveSegments : Integer
      * shapes — Array of shapes or a single shape.
      * curveSegments - Integer - Number of segments per shape. Default is 12.
      */
      let plat = new THREE.ShapeBufferGeometry(shape, 12);
      this.geometries.push(plat);

      /**
       * ExtrudeBufferGeometry
       * shapes : Array
       * options : Object
       * - curveSegments : int. Number of points on the curves. Default is 12.
       * - steps : int. Number of points used for subdividing segments along the depth of the extruded spline. Default is 1.
       * - depth : float. Depth to extrude the shape. Default is 100.
       * - bevelEnabled : bool. Apply beveling to the shape. Default is true.
       * - bevelThickness : float. How deep into the original shape the bevel goes. Default is 6.
       * - bevelSize : float. Distance from the shape outline that the bevel extends. Default is bevelThickness - 2.
       * - bevelOffset : float. Distance from the shape outline that the bevel starts. Default is 0.
       * - bevelSegments : int. Number of bevel layers. Default is 3.
       * - extrudePath : THREE.Curve. A 3D spline path along which the shape should be extruded.
       * - UVGenerator : Object. object that provides UV generator functions
       */
      let extrude = new THREE.ExtrudeBufferGeometry(shape, {
        steps: 2,
        depth: this.size / 2,
        bevelEnabled: true,
        bevelThickness: this.size / 4,  // 斜角的厚度 // 现在总厚度 = depeth + 2 * bevelThickness
        bevelSize: this.size / 4,       // 斜角的大小
        bevelOffset: 0,                 // 斜角起点到 shape outline 的距离
        bevelSegments: 2,               // 斜角用几个面绘制，数目越大斜角越圆润
      })
      this.geometries.push(extrude);

      /**
       * LatheBufferGeometry
       * points : Array, 
       * segments : Integer,
       * phiStart : Float,
       * phiLength : Float
       * points - Array of Vector2s. The x-coordinate of each point must be greater than zero.
       * segments — the number of circumference segments to generate. Default is 12.
       * 可以理解为在平面上的一四象限画线, 然后把这根线转一圈(转圈按照segments)
       */
      let points = [];
      for (let x = 0; x < this.size/2; x += 0.5) {
        points.push(new THREE.Vector2(x, x - this.size/2)); 
      }
      for (let x = this.size/2; x >= 0 ; x -= 0.5) {
        points.push(new THREE.Vector2(x, Math.sqrt(this.size/2 * this.size/2 - x * x))); 
      }
      let lathe = new THREE.LatheBufferGeometry(points, 3);
      this.geometries.push(lathe)

      /**
       * TetrahedronBufferGeometry
       * @extends PolyhedronBufferGeometry
       * radius : Float, 
       * detail : Integer
       */
      let tetrahedron = new THREE.TetrahedronBufferGeometry(this.size/2);
      this.geometries.push(tetrahedron);

      /**
       * OctahedronBufferGeometry
       * @extends PolyhedronBufferGeometry
       * radius : Float, 
       * detail : Integer,
       * radius — Radius of the octahedron. Default is 1.
       * detail — Default is 0.
       * Setting this to a value greater than zero add vertices making it no longer an octahedron.
       */
      let octahedron = new THREE.OctahedronBufferGeometry(this.size / 2);
      this.geometries.push(octahedron);

      /**
       * DodecahedronBufferGeometry
       * @extends PolyhedronBufferGeometry
       * radius : Float,
       * detail : Integer,
       * detail Default is 0.
       * Setting this to a value greater than 0 adds vertices making it no longer a dodecahedron.
       */
      let dodecahedron = new THREE.DodecahedronBufferGeometry(this.size / 2);
      this.geometries.push(dodecahedron);

      /**
       * IcosahedronBufferGeometry
       * @extends PolyhedronBufferGeometry
       * radius : Float,
       * detail : Integer,
       * detail Default is 0.
       * Setting this to a value greater than 0 adds vertices making it no longer a dodecahedron.
       */
      let icosahedron = new THREE.IcosahedronBufferGeometry(this.size / 2);
      this.geometries.push(icosahedron);

      /**
       * ParametricBufferGeometry
       * func : Function, 
       * slices : Integer, 
       * stacks : Integer
       * func — A function that takes in a u and v value each between 0 and 1 and modifies a third Vector3 argument
       * slices — The count of slices to use for the parametric function
       * stacks — The count of stacks to use for the parametric function
       */
      // 一个参数可以构建一个平面
      // 两个参数可以构建一个空间
      // u, v 从 0 取到 1
      let ArchimedeanSpiral = function(u, v, target) {
        let r = that.size/2 * u;
        // 最简单的 parametric curve
        let x = -r * Math.sin(u * that.size * Math.PI); // tsint 的变种
        let y = r * Math.cos(u * that.size * Math.PI); // tcost 的变种
        let z = that.size / 2 * v;
        return target.set(x, y, z);
      }
      let parametric2d = new THREE.ParametricBufferGeometry(ArchimedeanSpiral, 220, 120);
      this.geometries.push(parametric2d);

      let WhateverSpiral = function (u, v, target) {
        let r = u * 2 * Math.PI;
        let x, y, z;
        x = 3 * Math.cos(u * Math.PI) + Math.cos(u * Math.PI) * Math.cos(v * Math.PI);
        z = 3 * Math.sin(u * Math.PI) + Math.sin(u * Math.PI) * Math.cos(v * Math.PI);
        y = Math.sin(v * Math.PI);
        return target.set(x, y, z);
      }
      let parametric3d = new THREE.ParametricBufferGeometry(WhateverSpiral, 3, 120);
      this.geometries.push(parametric3d)

      /**
       * PlaneBufferGeometry
       * width : Float
       * height : Float
       * widthSegments : Integer
       * heightSegments : Integer
       */
       let plane = new THREE.PlaneBufferGeometry(this.size, this.size);
       plane.rotation = true;
       this.geometries.push(plane);

       /**
        * RingBufferGeometry
        * innerRadius : Float,
        * outerRadius : Float,
        * thetaSegments : Integer, // Minimum is 3. Default is 8.
        * phiSegments : Integer, // Minimum is 1. Default is 1.
        * thetaStart : Float,
        * thetaLength : Float
        */
       let ring = new THREE.RingBufferGeometry(this.size/4, this.size/2, 16, 8);
       ring.rotation = true;
       this.geometries.push(ring);
       
       /**
        * TextBufferGeometry
        * @extends ExtrudeBufferGeometry
        * text : String, 
        * parameters : Object
        */
        function fontLoader(url) {
          return new Promise(resolve => {
            // 把回调交给 Promise 承担
            new THREE.FontLoader().load(url, resolve)
          })
        }
        let font = await fontLoader('./src/res/assets/fonts/Liu Jian Mao Cao_Regular.json')
        let text = new THREE.TextBufferGeometry('苟利国家生死以', {
            font: font,
            size: this.size / 5,
            height: 1, 
          });
        // text.rotation = true
        this.geometries.push(text);

        /**
         * TorusBufferGeometry
         * radius : Float,  // Radius of the torus, from the center of the torus to the center of the tube. Default is 1.
         * tube : Float,  //  Radius of the tube. Default is 0.4.
         * radialSegments : Integer, // Default is 8
         * tubularSegments : Integer, // Default is 6.
         * arc : Float
         */
        let torus = new THREE.TorusBufferGeometry(
          this.size / 8 * 3 , 
          this.size / 16, 
          30, 
          200);
        this.geometries.push(torus);

        /**
         * TorusKnotBufferGeometry
         * radius : Float, 
         * tube : Float, 
         * tubularSegments : Integer, 
         * radialSegments : Integer, 
         * p : Integer 
         * This value determines, 
         * how many times the geometry winds around its axis of rotational symmetry. 
         * Default is 2.
         * q : Integer
         * This value determines,
         * how many times the geometry winds around a circle in the interior of the torus. 
         * Default is 3.
         */
        let torusKnot = new THREE.TorusKnotBufferGeometry(
          this.size/2, 
          this.size/8,
          21,
          16,
          2,
          3)
        this.geometries.push(torusKnot);
        
        /**
         * Curve
         * .getPoint : Vector 
         * - t : Float, A position on the curve. Must be in the range [ 0, 1 ].
         * - optionalTarget : Vector 
         */
        class CustomCurve extends THREE.Curve{
          constructor(scale) {
            super();
            this.scale = scale;
          }
          getPoint(t) {
            let tx = t * Math.sin(2 * Math.PI * t);
            let tz = t * Math.cos(2 * Math.PI * t);
            let ty = (2 * Math.PI * t * t -  2 * Math.PI * t + 1)
            return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
          }
        }
        let curve = new CustomCurve(this.size/2);
        /**
         * TubeBufferGeometry
         * path : Curve, 
         * tubularSegments : Integer, 
         * radius : Float, 
         * radialSegments : Integer, 
         * closed : Boolean
         */
        let tube = new THREE.TubeBufferGeometry(curve, 6, 1, 4, false);
        this.geometries.push(tube);

        let catmullRadius = this.size/2;
        let catmullCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-2 * catmullRadius, 0, 2 * catmullRadius),
          new THREE.Vector3(-catmullRadius, catmullRadius, catmullRadius),
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(catmullRadius, -catmullRadius, catmullRadius),
          new THREE.Vector3(2 * catmullRadius, 0, -2 * catmullRadius),
        ])
        let catmull = new THREE.TubeBufferGeometry(catmullCurve, 50, 1, 32, false);
        this.geometries.push(catmull);

        /**
         * PolyhedronBufferGeometry
         * vertices : Array, // Array of points of the form [1,1,1, -1,-1,-1, ... ] 
         * indices : Array, // Array of indices that make up the faces of the form [0,1,2, 2,3,0, ... ] 
         * radius : Float,  // The radius of the final shape 
         * detail : Integer // How many levels to subdivide the geometry. The more detail, the smoother the shape.
         */
        let magnification = this.size / 2
        let verticesOfCube = [
            -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
            -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
        ]
        // 把哪几个顶点(index) 连起来
        let indicesOfFaces = [
            2,1,0,    0,3,2,
            0,4,7,    7,3,0,
            0,1,5,    5,4,0,
            1,2,6,    6,5,1,
            // 2,3,7,    7,6,2,
            4,5,6,    6,7,4
        ]
        let polyhedron = new THREE.PolyhedronBufferGeometry(verticesOfCube, indicesOfFaces, this.size / 2, 0);
        // let material = new THREE.MeshNormalMaterial();
        // let g = new THREE.Mesh(polyhedron, material);
        // this.scene.add(g)
        this.geometries.push(polyhedron);
    },
    locateGeometries() {
      let material = new THREE.MeshLambertMaterial({ color: 0x21ccee, side: THREE.DoubleSide});
      let locatedGeometries = gridCalculator(this.geometries, this.size, 2 * this.size);
      console.log(locatedGeometries)
      locatedGeometries.coordinates.forEach(geometry => {
        const mesh = new THREE.Mesh(geometry.obj, material);
        mesh.position.set(geometry.x, 0, geometry.y);
        mesh.castShadow = true;
        if (geometry.rotation) {
          mesh.rotateX(Math.PI / 2);
        }
        this.scene.add(mesh);
        this.meshes.push(mesh);
        
        // if (this.wireframe) {
        let wireframe = new THREE.WireframeGeometry(geometry.obj);
        let line = new THREE.LineSegments(wireframe);
        line.material.color = new THREE.Color(0xffffff);
        line.material.depthTest = false;
        line.material.opacity = 0.2;
        line.material.transparent = true;
        line.position.set(geometry.x, 0, geometry.y);
        this.lines.push(line)
        this.scene.add(line);
        if (geometry.rotation) {
          line.rotateX(Math.PI / 2);
        }
        // }
      })
    },
    // set light, plane, helper, etc.
    buildStudio() {
      this.scene.add(new THREE.AmbientLight(0xffffff, 0.2));

      let light = new THREE.SpotLight(0xffffff);
      light.angle = 1.05;
      light.intensity = 1.2;
      light.penumbra = 1;
      light.decay = 2;

      light.position.set(2000, 0, 0);
      light.lookAt(new THREE.Vector3(0, 0, 0));
      light.castShadow = true;
      light.shadow.mapSize.width = 2048;
      light.shadow.mapSize.height = 2048;
      light.shadow.camera.near = 0.5;
      light.shadow.camera.far = 2000;

      this.scene.add(light);
      this.$set(this.studio, 'light', light)

      // let lightShallow = new THREE.SpotLight(0xdddddd);
      // lightShallow.angle = 1.05;
      // lightShallow.intensity = 0.3;
      // lightShallow.penumbra = 1;
      // lightShallow.decay = 2;

      // lightShallow.position.set(1500, 0, 1500);
      // lightShallow.lookAt(new THREE.Vector3(0, 0, 0));
      // lightShallow.castShadow = true;
      // lightShallow.shadow.mapSize.width = 2048;
      // lightShallow.shadow.mapSize.height = 2048;
      // lightShallow.shadow.camera.near = 0.5;
      // lightShallow.shadow.camera.far = 2000;
      // this.scene.add(lightShallow);
      // this.$set(this.studio, 'lightShallow', lightShallow)
      
      let geometry = new THREE.PlaneBufferGeometry( 2000, 2000, 32, 32 );
      geometry.rotateX(Math.PI / 2);
      let material = new THREE.MeshLambertMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
      let plane = new THREE.Mesh( geometry, material );
      plane.receiveShadow = true;
      plane.position.y = -10;
      this.scene.add( plane );



    },
    initCamera() {
      let fov = 60, aspect = window.innerWidth / window.innerHeight, near = 0.1, far = 4000;
      this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      this.camera.position.set(0, 30, 50);
      this.camera.lookAt(origin);
      let controls = new OrbitControls(this.camera, this.renderer.domElement);
    },
    initScene() {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x212121);
    },
    initRenderer() {
      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      let element = document.getElementById('container');
      element.appendChild(this.renderer.domElement);
    },
    render() {
      this.count += 5;
      const t = this.count / 360;
      const r = 300;

      let lx = r * Math.cos(t);
      let ly = r * Math.sin(t);
      // let lsx = r * Math.cos(t + 30);
      // let lsy = r * Math.sin(t + 30);

      this.studio.light.position.set(lx, 70, ly);
      this.studio.light.lookAt(origin);
      // this.studio.lightShallow.position.set(lsx, 70, lsy);
      // this.studio.lightShallow.lookAt(origin);

      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.render);
    },
    updateParams() {
      /**
       * Geometry 的参数一旦确定无法重新设置，我们实质上是重新绘制一遍图形
       */
      this.meshes.forEach(mesh => {
        this.scene.remove(this.meshes);
      });
      this.invokeGeometries();
      this.locateGeometries();
    },
    toggleLines() {
      this.lines.forEach(line => {
        line.visible = !line.visible;
      });
    }
  }
}
</script>

<style scoped lang='scss'>
</style>