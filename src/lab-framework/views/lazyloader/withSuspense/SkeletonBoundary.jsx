import React, { Suspense, lazy, Component } from "react";
import SampleSkeleton from "../SampleSkeleton";

class SkeletonBoundary extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(prev) {
    return prev.isRender !== this.props.isRender;
  }

  render() {
    const Children = React.lazy(() => new Promise(
      async r => {
        await new Promise(r2 => {
          if(this.props.isRender === true) r2()
        })
        /** 自己实现的自由度可以不局限于 import(modules) */
        r(import('../SampleContent'))
      }
    ))
    const Skeleton = () => this.props.Skeleton || <SampleSkeleton />
    return (
      <> {
        (<Suspense fallback={<Skeleton></Skeleton>}>
          <Children></Children>
        </Suspense>)
      } </>
    )
  }
}

export default SkeletonBoundary;