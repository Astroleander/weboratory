import React, { Component } from 'react';
import Model from './Model'

import './index.scss'

export class Gallery extends Component {
  render() {
    return (
      // an attempt to float
      <>
        <section id='chess-hud'>
          <div id='logo-mark' className='title row-1 col-1'>CHESS</div>
          <div id='menu' className='title row-reverse-1 col-1'>menu</div>

          <div id='piece-name' className='title row-2 col-5'>QUEEN</div>
          <div id='piece-description' className='row-2 col-6'>
            The ♛ is the most powerful piece in the game of chess.
          </div>
          <div id='piece-wiki' className='row-2 col-7'>wiki</div>

        </section>
        <section id='chess-model'>
          <div id='piece-3d' className='row-middle'><Model></Model></div>
        </section>
      </>
    );
  }

  componentDidMount() {
  }

}

export default Gallery;
