import React from 'react';
import { HashRouter, Switch, Route} from 'react-router-dom'

import NavLaout from './layout/NavLayout'
import CommonLayout from './layout/CommonLayout'

const index = () => {
  return (
    <HashRouter>
      <Switch>
        <Route
          path='/*'
          component={CommonLayout}
        />
        <Route
          path=''
          component={NavLaout}
        />
      </Switch>
    </HashRouter>
  );
}

export default index;
