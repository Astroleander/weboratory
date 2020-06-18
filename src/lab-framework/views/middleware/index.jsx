import React, { Component } from 'react';

import {middlewaresLoader, middlewaresList} from './middlewareLoader'

class MiddlewareSample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signal: 'exec'
    }
  }
  async componentDidMount() {
    let loader = await middlewaresLoader(middlewaresList, (resolve) => {
      setTimeout(() => {
        console.log('updated!');
        this.setState({signal: 'done!'})
        resolve()  
      }, 2500)
    }, this) ;
    loader()
  }
  render() {
    return (
      <article>
        <div>{this.state.signal}</div>
      </article>
    );
  }
}

export default MiddlewareSample;
