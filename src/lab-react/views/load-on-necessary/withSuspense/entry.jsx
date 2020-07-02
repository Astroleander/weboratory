import React from 'react'
import SkeletonBoundary from './SkeletonBoundary';
import { useEffect, useReducer } from 'react'

import SampleContent from '../SampleContent';
import useInterval from '../../../../components/useInterval';


export default function Entry() {
  /* 初始化每个组件为 [ 未渲染 ] 状态 */
  const renderers = new Array(10).fill(0);
  return (
    <div>
      <h1>with Suspense / React.lazy</h1>
      {renderers.map((_, idx) => {
        return ( 
        <SkeletonBoundary key={idx}>
          {/* Component 延迟加载的 Suspense 方案是没有子元素的 */}
          {/* <SampleContent></SampleContent> */}
        </SkeletonBoundary>      
        )}
      )}
    </div>
  )
}
