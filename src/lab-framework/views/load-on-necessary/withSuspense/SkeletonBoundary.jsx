import React, { Suspense, lazy, Component } from "react";
import SampleSkeleton from "../SampleSkeleton";

class SkeletonBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: false
    }
    this.wrapper = null;
    this.observer = null;
  }

  shouldComponentUpdate(prevProps, prevState) {
    return prevState.pending !== this.state.pending
  }
 
  componentDidMount() {
    this.observer = new IntersectionObserver((entris) => {
      entris.forEach(entry => {
        if (entry.isIntersecting) {
          this.setState({
            pending: true
          })
        }
      })
    }, {
      root: null
    });
    this.observer.observe(this.wrapper)
  }
 
  render() {
    const Children = React.lazy(() => new Promise(
      async r => {
        await new Promise(r2 => {
          if(this.state.pending === true) r2()
        })
        /** 自己实现的自由度可以不局限于 import(modules) */
        r(import('../SampleContent'))
      }
    ))
    const Skeleton = () => this.props.Skeleton || <SampleSkeleton />
    return (
      <div ref={el => {this.wrapper = el}}> {(
        <Suspense fallback={<Skeleton></Skeleton>}>
          <Children></Children>
        </Suspense>
        )} 
      </div>
    )
  }
}

export default SkeletonBoundary;