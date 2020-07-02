import React, { Component } from 'react';

export default class SkeletonBoundary extends React.Component {
  state = {
    pending: false,
  }
  componentDidMount() {
    this.observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.setState({pending: true})
        }
      })
    }, {
      root: null
    })
    this.observer.observe(this.wrapper)
  }
  shouldComponentUpdate(prev) {
    return this.state.pending !== this.props.pending 
  }
  renderContent() {
    const { children, fallback } = this.props;
    const { pending } = this.state;
    if (pending) {
      return children
    } else {
      return fallback
    }
  }
  render() {
    return (
      <div ref={el => this.wrapper = el}>
        {this.renderContent()}
      </div>
    )
  }
}