
import React, { useState,useReducer } from 'react';
import TransitionWrapper from './index.view';
import * as Eases from '../../components/useAnimation/ease.ts';

const initState = {
  delay: 500,
  duration: 2000,
  max_fps: 30,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'delay':
      return {
        ...state,
        delay: state.delay > 1000 ? 100 : state.delay + 100
      }
    case 'duration':
      return {
        ...state,
        duration: state.duration > 3000 ? 300 : state.duration + 300
      }
    case 'max_fps':
      return {
        ...state,
        max_fps: state.max_fps > 120 ? 1 : state.max_fps * 2
      }
    case "reset":
        return initState;
  }
}

export default function () {
  const [show, setShow] = useState(true);
  const [state, dispatch] = useReducer(reducer, initState);
  
  const handleClick = (type) => {
    dispatch({type});
  }

  return (<>
    <p>
      <button onClick={() => handleClick('delay')}>Delay: {state.delay}</button>
      <button onClick={() => handleClick('duration')}>Duration: {state.duration}</button>
      <button onClick={() => handleClick('max_fps')}>Max FPS: {state.max_fps}</button>
    </p>
    {Object.keys(Eases).slice(0).map(ease_name => {
      return show && <TransitionWrapper key={ease_name} ease={Eases[ease_name]} {...state}>
        <button
          onClick={() => { setShow(false); setTimeout(() => setShow(true), 100) }}
          style={{ height: '150px', width: '150px' }}>
          {ease_name}
        </button>
      </TransitionWrapper>
    }
    )}
  </>)
}