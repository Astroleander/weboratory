
import React, {useState} from 'react';
import TransitionWrapper from './index.view';
import * as Eases from '../../components/useAnimation/ease.ts';

export default function () {
  const [show, setShow] = useState(true);
  return (<>
    {Object.keys(Eases).map(ease_name => {
      return show && <TransitionWrapper key={ease_name} ease={Eases[ease_name]} delay={500} duration={2000}>
        <button 
          onClick={()=>{ setShow(false); setTimeout(()=>setShow(true),100) }} 
          style={{height: '150px', width: '150px'}}>
          {ease_name}
        </button>
      </TransitionWrapper>}
    )}
  </>)
}