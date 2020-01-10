import React, { Component } from 'react'
const test_styled = {
  width: `100vw`,
  height: '100vh',
  background: 'grey'
}
export default class Index extends Component {
  render() {
    return (
      <div style={test_styled}>
      {/* <div> */}
        Page for test
      </div>
    )
  }
}
