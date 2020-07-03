import React, { Suspense } from 'react'
const style = {
  display: 'flex',
  flexDirection: 'row',
  flex: '1 1 0',
}
export default function LazyLoader() {
  let PlanA = React.lazy(() => import('./withSuspense/entry'))
  let PlanB = React.lazy(() => import('./withEasyBoundary/entry'))
  let PlanC = React.lazy(() => import('./withEasyBoundaryDebounce/entry'))
  let PlanD = React.lazy(() => import('./withEasyBoundaryDebounceAfterExec/entry'))
  
  return (
    <article id='lazylaoder' style={style}>
      <Suspense>
        <PlanA></PlanA>
      </Suspense>
      <Suspense>
        <PlanB></PlanB>
      </Suspense>
      <Suspense>
        <PlanC></PlanC>
      </Suspense>
      <Suspense>
        <PlanD></PlanD>
      </Suspense>
    </article>
  )
}