import React, { Component } from "react";

export default class PlayerGenerator extends Component {
  render() {
    return <div>Roll Dice
      <button onClick={e => this.props.onClick(seed())}>Roll Dice</button>
    </div>;
  }
}
const seed = () => {
  return {
    rare: Math.random()

  }
}
const defaultSeed = seed();

export { defaultSeed }