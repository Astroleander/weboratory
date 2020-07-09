import React from 'react'
import Sample from './views/SampleChild'
import viewList from './views';

export default function index() {
  return (
    <article>
      {
        Array.from(viewList.keys()).map(key => {
          let Template= viewList.get(key);
          console.log(key)
          // console.log(F())
          return <Template key={key} />
        })
      }
    </article>
  )
}
