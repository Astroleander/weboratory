import React, { Component } from 'react';
import Model from './Model'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import './index.scss'
import CONFIG from './config'

export class Gallery extends Component {
  constructor(props) {
    super(props);
    this.piece = CONFIG.pieces[0];
    console.log(this.piece)
    this.dragStart = this.dragStart.bind(this);
    this.draging = this.draging.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.piecebox = React.createRef();
  }
  
  render() {
    return (
      // an attempt to float
      <>
        <section id='chess-hud'>
          <div id='logo-mark' className='title row-1 col-1'>CHESS</div>
          <div id='menu' className='title row-reverse-1 col-1'>menu</div>

          <div id='piece-name' className='title row-2 col-5'>
            {this.piece && this.piece.name}
          </div>
          <div id='piece-description' className='row-2 col-6'>
            {this.piece && this.piece.describe}
          </div>
          <div id='piece-wiki' className='row-2 col-7'>wiki</div>
          <div id='piece-box-container' ref={this.piecebox} className='row-reverse-2 col-reverse-2'
            onMouseDown={this.dragStart} 
            onMouseMove={this.draging}
            onMouseUp={this.dragEnd}
            >
            {/* {this.buttonList()} */}
            <div id='piece-box'>
              <ButtonList></ButtonList>
            </div>
          </div>
        </section>
        <section id='chess-model'>
          <div id='piece-3d' className='row-middle'><Model></Model></div>
        </section>
      </>
    );
  }

  dragStart(e) {
    this.shiftX = e.pageX
  }
  
  draging(e) {
    if (this.shiftX) {
      this.piecebox.current.scrollLeft += this.shiftX - e.pageX
      this.shiftX = e.pageX;
    }
  }
  dragEnd(e) {
    this.shiftX = 0;
  }
}

function rem (rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
}

function getMatcaps(idx) {
  const MATCAPS = require.context('@/res/assets/textures/matcaps', false, /\.png$|\.jpg$/, 'lazy').keys()
    .map(each => `src/res/assets/textures/matcaps${each.slice(1)}`);
  const loader = new THREE.TextureLoader();
  const matcap = loader.load(MATCAPS[idx % 2 ? 1 : 7], () => {
    matcap.encoding = THREE.sRGBEncoding;
  })
  return matcap;
}

function createModel(piecename = 'Queen.glb', idx = 0) {
  return new Promise(r => {
    /** material */
    let matcap = getMatcaps(idx);
    let material = new THREE.MeshMatcapMaterial({
      matcap,
      flatShading: false
    })
    /** mesh */
    let box;
    const loader = new GLTFLoader();
    loader.setPath('../src/res/assets/obj/');
    loader.load(`${piecename}.glb`, (gltf) => {
      box = new THREE.Box3().setFromObject(gltf.scene);
      console.log(box)
      box.getCenter(gltf.scene.position);
      console.log(box)
      gltf.scene.position.multiplyScalar(-1);
      console.log(gltf.scene)
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = material;
        }
      });
      const model = new THREE.Group();
      model.add(gltf.scene);
      r(model)
    })
  })
}

function ButtonList () {
  return (
    CONFIG.pieces.map((piece, idx) => {
      const width = rem(10)
      const height = rem(10)

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width/height, .1, 200);
    
      camera.position.y = -18;
      camera.lookAt(new THREE.Vector3(0, 0, 0))
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setClearColor('#FFFFFF', 0);
      renderer.render(scene, camera);
      renderer.setSize(width, height);

      createModel(piece.name, idx).then(model => {
        scene.add(model)
        renderer.render(scene, camera);
      })

      let ele = <Box
        // style={width, height}
        element={renderer.domElement}
        key={piece.name}
      ></Box>;
      return ele
    }
    )
  )
}

class Box extends Component {
  componentDidMount() {
    console.log(this.mount)
    this.mount.appendChild(this.props.element)
  }
  render() {
    return (
      <button
        className='box'
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}
export default Gallery;
