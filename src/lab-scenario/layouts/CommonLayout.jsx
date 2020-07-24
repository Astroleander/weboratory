import React, { Component } from 'react';
import FABG from '@/components/FABG';

export class CommonLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { component: null };
  }
  componentDidMount(nextProps, prevState, snapshot) {
    let pathname = this.props.location.pathname;
    getScene(pathname).then(component => this.setState({ component }));
  }
  render() {
    const Scenario = this.state.component
    return Scenario && (
      <>
        <Scenario />
        <FABG />
      </>
    );
  }
}

function getScene(pathname) {
  console.log(pathname)
  return new Promise(resolve => {
    import('@/lab-scenario' + pathname).then(m => {
      resolve(m.default ? m.default : m);
    });
  });
}

export default CommonLayout;
