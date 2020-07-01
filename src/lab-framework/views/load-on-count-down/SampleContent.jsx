import React, { Component } from 'react';
import './sample.scss'

class SampleContent extends Component {
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
    }, 500)
  };
  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = null;
  }
  render() {
    return (
      <div className='content'>
        <p>Content</p>
        <p>{(this.state.count).toFixed(1)}</p>
      </div>    
    );
  }
}

export default SampleContent;