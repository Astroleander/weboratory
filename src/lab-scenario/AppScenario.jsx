import React, { PureComponent } from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';

import view_list from './router';

const formatName = name => {
  return name;
};

export default class Home extends PureComponent {
  render() {
    return (
      <>
        <section id='scenario-home' className='home'>
          <HashRouter>
            {this.renderRouter(view_list)}
          </HashRouter>
        </section>
      </>
    );
  }
  renderRouter(view_list) {
    return view_list.map((view, idx) => {
      let { name, path } = view;
      return (
        <Link key={`${idx}`} to={path}>
          <li>{formatName(name)}</li>
        </Link>
      );
    });
  }
}