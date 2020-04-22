import React, { PureComponent } from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';

import view_list from './router'

export default class Home extends PureComponent {
  constructor() {
    super();
  }
  render() {
    return (
      <>
        <section id='scenario-home' className='home'>
          <HashRouter>
            {this.renderRouter(view_list)}
          </HashRouter>
        </section>
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