import React, { PureComponent } from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';

import view_list from './router'

export default class Dashboard extends PureComponent {
  constructor() {
    super();
  }
  render() {
    return (
      <>
        <article id='scenario-dashboard'>
          <HashRouter>
            {this.renderRouter(view_list)}
          </HashRouter>
        </article>
      </>
    )
  }
  renderRouter(view_list) {
    return view_list.map((view, idx) => {
      return (
        <Link key={`${idx}`} to={view.path}>
          <li>{view.name}</li>
        </Link>
      )
    })
  }
}