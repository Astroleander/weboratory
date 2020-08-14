import React from 'react'

export default function Test(props) {
  return (
    <section style={{fontSize: '0.8em'}}>
      <h1 style={{color: '#37b'}}>{props.title[0].toUpperCase() + props.title.slice(1) || 'Title'}</h1>
      <div style={{color: '#999'}}>{
        Object.keys(props).map(propKey => {
          return <p className='no-margin' key={JSON.stringify(propKey)}>{propKey}: {JSON.stringify(props[propKey])}</p>
        })
      }</div>
    </section>
  )
}
