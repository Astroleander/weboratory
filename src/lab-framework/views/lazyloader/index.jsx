import React, { Suspense } from 'react'

export default function LazyLoader() {
  let PlanA = React.lazy(() => import('./withSuspense/entry'))
  return (
    <article id='lazylaoder'>
      <Suspense>
        <PlanA></PlanA>
      </Suspense>
    </article>
  )
}
