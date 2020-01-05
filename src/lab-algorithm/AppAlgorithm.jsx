import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import NavLayout from './layouts/NavLayout';
import AlgoLayout from './layouts/AlgoLayout';

export default class AppAlgorithm extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route 
            path='/algorithm'
            component={AlgoLayout}
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