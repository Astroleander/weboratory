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
    this.state = {
      piece: CONFIG.pieces[0]
    }
    this.dragStart = this.dragStart.bind(this);
    this.draging = this.draging.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.handlePieceChanged = this.handlePieceChanged.bind(this);
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
            {this.state.piece && this.state.piece.name}
          </div>
          <div id='piece-description' className='row-2 col-6'>
            {this.state.piece && this.state.piece.proverb}
          </div>
          <div id='piece-wiki' className='row-2 col-7'>wiki</div>
          <div id='piece-box-container' ref={this.piecebox} className='row-reverse-2 col-reverse-2'
            onMouseDown={this.dragStart} 
            onMouseMove={this.draging}
            onMouseUp={this.dragEnd}
            /** 离开滚动区域需要结算当前结果不然会重现 gbf 选属性的那个经典 bug */
            onMouseLeave={this.dragEnd}
            >
            {/* {this.buttonList()} */}
            <div id='piece-box'>
              <ButtonList onPieceSelected={e => this.handlePieceChanged(e)}></ButtonList>
            </div>
          </div>
        </section>
        <section id='chess-model'>
          <div id='piece-3d' className='row-middle'>
            <Model 
              piece={ this.state.piece }
              ref={instance => { this.model = instance }}
              /** [⛔ Abandoned] 我们并不希望组件级别的 patch, 更何况这是一个 webGL 组件 */
              // key={ this.state.piece.name }
            >  
            </Model>
            </div>
        </section>
      </>
    );
  }
  handlePieceChanged(p) {
    /** state may doesn't refresh immediately */
    this.setState(prestate => {
      prestate.piece = p;
      return p
    })
    /** dispatch */
    // this.model.handleChangeModel(this.state.piece);
    this.model.handleChangeModel(p);
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
      // console.log(box)
      box.getCenter(gltf.scene.position);
      // console.log(box)
      gltf.scene.position.multiplyScalar(-1);
      // console.log(gltf.scene)
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
/** 函数组件是无状态的, 这里要检查是否更新渲染不能用函数形 */
class ButtonList extends Component {
  shouldComponentUpdate() {
    /** 禁止重绘按钮 */
    return false;
  }
  render () {
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
          element={renderer.domElement}
          key={piece.name}
          piece={piece}
          onSelected={e => this.props.onPieceSelected(piece)}
        ></Box>;
        return ele
      }
      )
    )
  }
}
class Box extends Component {
  componentDidMount() {
    this.mount.appendChild(this.props.element)
  }
  render() {
    return (
      <button
        onMouseDown={()=> this.stamp = Date.now()}
        onClick={()=>{
          /** 需要过滤 Drag 导致的假点击 */
          if (Date.now() - this.stamp < 150) {
            return this.props.onSelected()
          }
        }}
        className='box'
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}
export default Gallery;
