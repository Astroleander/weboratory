import React, { Component } from 'react';
import './index.fallbacks.less'

class SamplePending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      timestamp: Date.now(),
    };
    this.interval = null;
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      let now = Date.now()
      this.setState((p) => ({
        count: p.count + ((now - p.timestamp) / 1000),
        timestamp: now
      }))
    }, 300)
  };
  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = null;
  }
  render() {
    return (
      <div className='skeleton'>
        <p>One Card for 3 status</p>
        <p>{(this.state.count).toFixed(1)}</p>
      </div>    
    );
  }
}

export default SamplePending;