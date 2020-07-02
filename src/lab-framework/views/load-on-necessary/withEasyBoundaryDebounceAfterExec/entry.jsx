import React, { Component } from 'react';

import SkeletonBoundary from './SkeletonBoundary'

import Content from '../SampleContent'
import Skeleton from '../SampleSkeleton';

class Entry extends Component {
  state = {
    renderers: new Array(10).fill(0),
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <div>
        <h1>with Boundary Setting Debounce Immediately (无用)</h1>
        {
          this.state.renderers.map((render, idx) => {
            return (
              <SkeletonBoundary fallback={<Skeleton></Skeleton>} key={idx}>
                <Content></Content>
              </SkeletonBoundary>
            )
          })
        }
      </div>
    );
  }
}

/** React.lazy 只接受 function / Promise upon import */
export default () => <Entry></Entry>;