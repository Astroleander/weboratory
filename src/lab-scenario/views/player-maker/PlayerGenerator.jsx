import React, { Component } from "react";

export default class PlayerGenerator extends Component {
  render() {
    return <div>Roll Dice
      <button onClick={e => this.props.onClick()}>Roll Dice</button>
    </div>;
  }
}
