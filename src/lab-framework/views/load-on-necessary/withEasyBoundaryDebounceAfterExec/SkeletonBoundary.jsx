import React, { Component } from 'react';
const debounce = (fn, delay) => {
  let timing;
  return function(...args) {
    timing && clearTimeout(timing);
    if (/* do now */!timing) {
      fn(...args)
    }
    timing = setTimeout(() => {
      timing = null;
    }, delay);
  }
};
const _checkPending = (ctx) => {
  console.log('fire')
  const values = ctx.observerObject.observerList.values();
  Array.from(values).forEach(el => {
    if (el.isIntersecting) {
      ctx.setState({ pending: true })
    }
  })
};

export default class SkeletonBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.observerObject = {
      observer: null,
      observerList: new Map(),
    }
    this.observerOptions = {
      root: null,
      threshold: 0.5
    }
  }
  state = {
    pending: false,
  }
  /* checkPending 每个实例必须各自持有一个 */
  checkPending = debounce(_checkPending, 1000);
  intersectionChangeCallback(entries) {
    entries.forEach(el => {
      this.observerObject.observerList.set(el.target, el);
      this.checkPending(this);
    })
  }
  componentDidMount() {
    this.observerObject.observer = new IntersectionObserver(entries => this.intersectionChangeCallback(entries), this.observerOptions)
    this.observerObject.observer.observe(this.wrapper)
  }
  shouldComponentUpdate(prevP, prevS) {
    return this.state.pending !== prevS.pending 
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