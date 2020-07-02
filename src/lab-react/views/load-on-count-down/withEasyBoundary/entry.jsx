import React, { Component } from 'react';

import SkeletonBoundary from './SkeletonBoundary'

import Content from '../SampleContent'
import Skeleton from '../SampleSkeleton';

class Entry extends Component {
  state = {
    renderers: new Array(10).fill(false),
    count: -1
  }
  componentDidMount() {
    /* 模拟 emit 所有的「开始渲染」指令 */
    this.interval = setInterval(() => {
      this.setState((p) => ({count: p.count + 1}), ()=>{
        if (this.state.count > this.state.renderers.length) return;
        this.setState((p) => ({
          renderers: p.renderers.map((_, idx) => idx === this.state.count ? true : this.state.renderers[idx])
        }))
        console.log(this.state)
      }) 
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div>
        <h1>with Customary Promise Boundary</h1>
        {
          this.state.renderers.map((render, idx) => {
            return (
              <SkeletonBoundary pending={render} fallback={<Skeleton></Skeleton>} key={idx}>
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