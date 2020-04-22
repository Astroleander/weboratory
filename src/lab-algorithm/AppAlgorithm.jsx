import React, { Component } from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';

import './styles/tags.scss'
import view_list from '@algorithm/router/algorithm'

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      nameset: new Set(),
      buffer: ''
    };
  }
  parsePath(path) {
    const UNNECESSARY_HEAD_LENGTH = 1;
    const TAIL_LENGTH = 1;

    const pathRoute = path.split(/\//g).slice(UNNECESSARY_HEAD_LENGTH);
    let fragments = pathRoute.slice(0, pathRoute.length - TAIL_LENGTH).map(tag => {
      if (!this.state.nameset.has(tag)) {
        this.state.nameset.add(tag);
        // this.forceUpdate()
      }
      return (<span key={tag} className={`tag-${tag}`}>{tag}</span>)
    })
    return (
      <>
      {fragments.map(e => e)}{pathRoute[pathRoute.length-1]}
      </>
    ) 
  }
  onBufferChange(event) {
    this.setState({ buffer: event.target.value });
  }
  render() {
    const filter = (route) => {
      return route.search(this.state.buffer) >= 0;
    }
    const renderedAlgoRouter = view_list.filter(e => filter(e.path)).map((item, idx) => {
      return (
        <li key={`${idx}`}>
          <Link to={item.path}>
            {this.parsePath(item.path)}
          </Link>
        </li>
      )
    })
    return(
      <>
        <nav>
          <input type='input' onChange={(e) => this.onBufferChange(e)} value={this.state.buffer}></input>
          <span onClick={() => this.setState({buffer : ''})} className={`tag-clear`}>clear</span>
          {Array.from(this.state.nameset)
            .map(e => (
            <span 
              onClick={
                () => this.state.buffer === e ? 
                  this.setState({buffer : ''}) : this.setState({buffer : e})
              } 
              className={`tag-${e}`} key={e}>{e}
            </span>))
          }
        </nav>
        <section id='algorithm-home' className='home'>
            <HashRouter>
              {renderedAlgoRouter}
            </HashRouter>
        </section>
      </>
    )
  }
}
