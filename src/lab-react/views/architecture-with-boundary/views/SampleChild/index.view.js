
import React from 'react'
import './index.view.less'

export default function View(props) {
  console.log(props)
  return (
    <div className={'sample'}>
      <div className='inner-content'>
        Sample Child {props.data}
      </div>
    </div>
  )
}
