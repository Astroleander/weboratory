import React, { Component } from 'react'

import './index.scss'
import Video from './middle-video'

/**
 * 
 * - 字符太多的时候发生器的运行状态不是很好
 * - 在 Pure React 中跨级调用组件并不是很开心的一件事
 * - 也许有朝一日我们应该用 hooks 重写 react 组件
 */

const test_styled = {
  width: `100vw`,
  height: '100vh',
  background: 'grey'
}

const CONST_TITLE = [
  "永遠存在の幻想郷",
  "今は眠れの幻想郷"
];

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fwidth: window.innerWidth / 2,
      directionRight: false,
      videoTitle: CONST_TITLE[0],
      floatButtonMode: true
    };
    this.move = this.move.bind(this)
  }
  render() {
    return (
      <>
        <article className='board' style={test_styled}>
          <section style={{width: `${this.state.fwidth}px`}} className='hud fragment'></section>
          <section className='show fragment'>
            <Video 
              title={this.state.videoTitle}
              subtitle='Adventure of the Rakuen no Miko ~~ Reimu Hakurei no Bouken ~~'/>
          </section>
          <section className='hud fragment'></section>
        </article>
        <div 
          className='float center'
          onClick={this.handleClickFloat.bind(this)} 
        >
          {(()=>{
            let ret = [];
            for (const i in [1,2,3,4]) {
              ret.push(
                <button
                  key={i}
                  className={`floating-button toggle-button ${this.state.floatButtonMode? 'left-mode': 'right-mode'}`}>
                </button>
              )
            }
            return ret
          })()}
        </div>
      </>
    )
  }
  handleClickFloat() {
    // this.videoRef.current.toggleName()
    let newTitle = this.state.videoTitle === CONST_TITLE[0] ? CONST_TITLE[1] : CONST_TITLE[0];
    let newMode = !this.state.floatButtonMode
    this.setState({
      videoTitle: newTitle,
      floatButtonMode: newMode
    })
    this.directionRight = !this.directionRight;
    this.directionRight ? this.move(this.state.fwidth, 0) : this.move(this.state.fwidth, window.innerWidth/2)
  }
  move(from, to, len = 30) {
    console.log(from, to);
    if (this.directionRight && from > 0) {
      from - len > 0 ? 
        this.setState({ fwidth: from - len}) :
        this.setState({ fwidth: 0})
        from -= len
    } else if (!this.directionRight && (from< window.innerWidth / 2 + 1)) {
      from + len < window.innerWidth / 2 + 1 ? 
        this.setState({ fwidth: from + len }) :
        this.setState({ fwidth: window.innerWidth / 2 })
        from += len
    } else {
      console.log('else!!')
      return
    }
    requestAnimationFrame(() => {
      this.move(from, to, len * 1.1)
    })
  }

}

