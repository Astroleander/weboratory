import React, { Component } from 'react';

import PlayerGenerator from './PlayerGenerator'
import PlayerDigital from "./PlayerDigital";
import PlayerList from "./PlayerList";

import './style.scss'

export class PlayerMaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      p: 1
    }
  }
  render() {
    return (
      <article className='container'>
        <PlayerGenerator onClick={e => setTimeout(e=>this.setState({p: 1}), 0)}></PlayerGenerator>
        <PlayerDigital n={this.state.p}></PlayerDigital>
        <PlayerList></PlayerList>
      </article>
    );
  }
}




function setID(id) {
  return this.constructor.name + '-' + id;
}


export default PlayerMaker;
