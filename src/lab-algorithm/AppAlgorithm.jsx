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
    const LEETCODE_DOT = 2;

    const pathRoute = path.split(/\//g).slice(UNNECESSARY_HEAD_LENGTH);
    let fragments = pathRoute.slice(0, pathRoute.length - TAIL_LENGTH).map((tag,i) => {
      if (!this.state.nameset.has(tag)) {
        this.state.nameset.add(tag);
        // this.forceUpdate()
      }
      // TODO: I do not like this special
      if (tag === 'special') {
        let sp = pathRoute[pathRoute.length - TAIL_LENGTH].split(/\./g)
        if (sp.length > LEETCODE_DOT + 1) {
          return (
            <span key={tag}>
              <span className={`tag tag-${tag}`}>{tag}</span>
              <span className={`tag`}>{sp[sp.length - LEETCODE_DOT]}</span>
            </span>
          )
        }
      }
      return (<span key={tag+i} className={`tag tag-${tag}`}>{tag}</span>)
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
          <span onClick={() => this.setState({buffer : ''})} className={`tag tag-clear`}>clear</span>
          {Array.from(this.state.nameset)
            .map(e => (
            <span 
              onClick={
                () => this.state.buffer === e ? 
                  this.setState({buffer : ''}) : this.setState({buffer : e})
              } 
              className={`tag tag-${e}`} key={e}>{e}
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
