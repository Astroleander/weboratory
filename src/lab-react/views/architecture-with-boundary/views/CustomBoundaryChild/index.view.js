
import React from 'react'
import './index.view.scss'

export default function View(props) {
  console.log(props)
  return (
    <div className={'sample', 'content'}>
      Customary Sample Child {props.data}
    </div>
  )
}
