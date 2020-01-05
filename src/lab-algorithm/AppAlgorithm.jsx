import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import NavLayout from './layouts/NavLayout';

export default class AppAlgorithm extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route 
            path='/algo'
            component={NavLayout}
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