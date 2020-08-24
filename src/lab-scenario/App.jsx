import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import NavLayout from './layouts/NavLayout';
import CommonLayout from './layouts/CommonLayout';

export default class AppScenario extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route
            path='/views'
            component={CommonLayout}
          />
          <Route
            path=''
            component={NavLayout}
          />
        </Switch>
      </HashRouter>
    )
  }
}