import React from 'react';
import ReactDOM from 'react-dom'

import('./App.jsx').then(m => {
  const App = m.default;
  ReactDOM.render(<App />, document.getElementById("laboratory-react"))
});
