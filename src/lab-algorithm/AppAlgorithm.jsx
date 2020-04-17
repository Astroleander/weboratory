import React, { Component } from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';

import view_list from '@algorithm/router/algorithm'

export default class Home extends Component {
  constructor() {
    super();
  }
  render() {
    const renderedAlgoRouter = view_list.map((item, idx) => {
      return (
        <li key={`${idx}`}>
          <Link to={item.path}>
            {item.path.replace(/\//g, ' - ')}
          </Link>
        </li>
      )
    })
    return(
      <>
        <div>Hello I'm nav bar</div>
        <article id='algorithm-home' className='home'>
            <HashRouter>
              {renderedAlgoRouter}
            </HashRouter>
        </article>
      </>
    )
  }
}
