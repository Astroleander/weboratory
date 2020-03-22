import React, { Component } from 'react';

import PlayerGenerator, { defaultSeed } from './PlayerGenerator'
import PlayerDigital from "./PlayerDigital";
import PlayerList from "./PlayerList";

import './style.scss'

export class PlayerMaker extends Component {
  constructor(props) {
    super(props);
    console.log(defaultSeed)
    this.state = {
      seed: defaultSeed
    }
  }
  render() {
    return (
      <article className='container'>
        <PlayerGenerator onClick={e => setTimeout(() => this.setState({seed: e}), 0)}></PlayerGenerator>
        <PlayerDigital seed={this.state.seed}></PlayerDigital>
        <PlayerList></PlayerList>
      </article>
    );
  }
}




function setID(id) {
  return this.constructor.name + '-' + id;
}


export default PlayerMaker;
