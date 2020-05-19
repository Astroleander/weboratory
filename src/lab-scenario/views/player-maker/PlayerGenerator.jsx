import React, { Component } from "react";

export default class PlayerGenerator extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return <div>Roll Dice
      <button onClick={e => this.props.onClick(seed())}>Roll Dice</button>
    </div>;
  }
}
const seed = () => {
  return {
    rare: Math.random(),
    index: + new Date()
}
}
const defaultSeed = seed();
const getNewSeed = () => seed();
export { defaultSeed, getNewSeed }