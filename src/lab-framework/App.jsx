import React from 'react';
import { HashRouter, Switch, Route} from 'react-router-dom'

import NavLaout from './layout/NavLayout'
import CommonLayout from './layout/CommonLayout'

const index = (props) => {
  return (
    <HashRouter base='/lab-framework/'>
      <Switch>
        <Route path="/views" component={CommonLayout} />
        <Route path="" component={NavLaout} />
      </Switch>
    </HashRouter>
  );
};

export default index;
