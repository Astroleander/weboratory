import React, { Component } from 'react';

export default class SkeletonBoundary extends React.Component {
  shouldComponentUpdate(prev) {
    return prev.pending !== this.props.pending 
  }
  render() {
    const { pending, children, fallback } = this.props;
    if (pending) {
      return children
    } else {
      return fallback
    }
  }
}