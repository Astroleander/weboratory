import React, { Component } from 'react'

import './index.scss'

const test_styled = {
  width: `len0vw`,
  height: 'len0vh',
  background: 'grey'
}
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fwidth: window.innerWidth / 2,
      directionRight: false 
    }
    this.move = this.move.bind(this)
  }
  render() {
    return (
      <>
        <article className='board' style={test_styled}>
          <section style={{width: `${this.state.fwidth}px`}} className='hud fragment'></section>
          <section className='show fragment'>

          </section>
          <section className='hud fragment'></section>
        </article>
        <button onClick={this.handleClickFloat.bind(this)} className='floating-button float left bottom'></button>
      </>
    )
  }
  handleClickFloat() {
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

