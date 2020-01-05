import React from 'react';
import ReactDOM from 'react-dom';

import AppAlgorithm from './AppAlgorithm'

const App = () => {
  return (
    <AppAlgorithm />
  );
};

ReactDOM.render(<App />, document.getElementById('laboratory-algorithm'));
export default App;