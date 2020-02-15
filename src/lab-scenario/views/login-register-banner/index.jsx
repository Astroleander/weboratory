import React, { Component } from 'react'

import './index.scss'
import Video from './Video'
import Register from './Register';

/**
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
      title: CONST_TITLE[0],
      subTitle: 'Adventure of the Rakuen no Miko ~~ Reimu Hakurei no Bouken ~~',
      floatButtonMode: true,
    };
    this.move = this.move.bind(this)
    /** 我也不知道这种技术该叫什么, 不过我们通过这种嵌套的方式可以织入 this 这样想要的参数*/
    window.onresize = e => (e, ctx) => {
      console.log(ctx.state.directionRight)
      if (!ctx.state.directionRight) {
        ctx.setState({ fwidth: window.innerWidth / 2 })
      }
    }
  }
  render() {
    return (
      <>
        <article className='board' style={test_styled}>
          <section className='hud fragment' 
            style={{width: `${this.state.fwidth}px`}}
          >
            <Register />
          </section>
          <section className='show fragment'>
            <Video 
              title={this.state.title}
              subtitle={this.state.subTitle}
            />
          </section>
          <section className='hud fragment'>

          </section>
        </article>
        <div 
          className='float center'
          onClick={this.handleClickFloat.bind(this)} 
        >
          {(()=>{
            let ret = [];
            for (const i in [1,2,3]) {
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
    /** 根据当前标题决定页面移动方向, 确定方向后使用 move 来开始移动 */
    let newTitle = this.state.title === CONST_TITLE[0] ? CONST_TITLE[1] : CONST_TITLE[0];
    let newMode = !this.state.floatButtonMode
    this.setState({
      title: newTitle,
      floatButtonMode: newMode
    })
    this.directionRight = !this.directionRight;
    this.directionRight ? this.move(this.state.fwidth, 0) : this.move(this.state.fwidth, window.innerWidth/2)
  }
  /**
   * 根据方向和步长, 获取下一步的位置, 并用这个位置刷新当前位置
   * 这个过程
   * 
   * @param {Number} from 起始点
   * @param {Number} to 结束点
   * @param {Number} len 步长, 通过增加步长来实现 ease-in 的曲线
   * TODO: Design real ease-in curve
   */
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
      console.log('move animation ends')
      return
    }
    requestAnimationFrame(() => {
      this.move(from, to, len * 1.1)
    })
  }

}

