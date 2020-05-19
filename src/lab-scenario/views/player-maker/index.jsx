import React, { Component } from 'react';

import PlayerGenerator, { getNewSeed } from './PlayerGenerator'
import PlayerDigital from "./PlayerDigital";
import PlayerList from "./PlayerList";

import './style.scss'

const defaultSeed = (()=>getNewSeed())();
export class PlayerMaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seed: defaultSeed,
      playerlist: [],
    }
    this.index = 0
    this.player = null
  }
  updateSeed () {
    this.setState({seed: (() => getNewSeed())()})    
  }
  shouldComponentUpdate(nextProps, nextStates) {
    console.log(nextStates, this.state)
    return true;
  }
  render() {
    return (
      <article className='container'>
        {console.log(this.state.seed)}
        <PlayerGenerator onClick={e => setTimeout(() => this.setState({seed: e}), 0)}></PlayerGenerator>
        <PlayerDigital seed={this.state.seed} setPlayer={(p)=>{this.player = p}}></PlayerDigital>
        <PlayerList 
          list={this.state.playerlist} 
          onClick={e=> {
            acceptPlayer(this, this.player);
            this.updateSeed();
          }}
          deleteItem={idx=> {
            this.state.playerlist.splice(idx, 1)
            this.setState({playerlist: this.state.playerlist})
          }
          }></PlayerList>
      </article>
    );
  }
}

const acceptPlayer = (ctx, e) => {
  ctx.state.playerlist.push(e);
  ctx.setState({playerlist: ctx.state.playerlist})
}


function setID(id) {
  return this.constructor.name + '-' + id;
}


export default PlayerMaker;
