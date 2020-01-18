import React, { Component } from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';

import view_list from '@algorithm/router/algorithm'

export default class Dashboard extends Component {
  constructor() {
    super();
  }
  render() {
    const renderedAlgoRouter = view_list.map((item, idx) => {
      return (
        <article className='dashboard'>
          <div className='list'>
            <li>
              <Link key={`${idx}`} to={item.path}>
                {item.path}
              </Link>
            </li>
          </div>
        </article>
      )
    })
    return(
      <>
        <div>Hello I'm Dashboard</div>
        <article id='algorithm-dashboard'>
          <HashRouter>
            {renderedAlgoRouter}
          </HashRouter>
        </article>
      </>
    )
  }
}
