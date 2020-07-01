import React from 'react'
import SkeletonBoundary from './SkeletonBoundary';
import { useEffect, useReducer } from 'react'

import SampleContent from '../SampleContent';
import useInterval from '../../../../components/useInterval';


export default function Entry() {
  /* 初始化每个组件为 [ 未渲染 ] 状态 */
  const [renderers, render] = useReducer((renderers, idx) => {
    renderers[idx] = true;
    return renderers
  }, new Array(10).fill(false).map((_, idx)=> idx < 2 ? true: false));

  /* MOCK LOAD EVERY 2 SECOND */
  const [cursor, cursorAdd] = useReducer(cursor => cursor += 1, 0);
  const interval = cursor < renderers.length ? 3000 : null;

  useInterval(() => {
    render(cursor)
    cursorAdd();
  }, interval);

  return (
    <div>
      <h1>with Suspense / React.lazy</h1>
      {renderers.map((isRender, idx) => {
        return ( 
        <SkeletonBoundary isRender={isRender} key={idx}>
          {/* Component 延迟加载的 Suspense 方案是没有子元素的 */}
          {/* <SampleContent></SampleContent> */}
        </SkeletonBoundary>      
        )}
      )}
    </div>
  )
}
