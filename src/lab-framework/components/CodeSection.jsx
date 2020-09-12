import React, { useState, useEffect, useCallback, useRef, useLayoutEffect} from 'react';

/** wrapper */
export const Sub = ({ component, name }) => {
  const [cswitch, toggleCswitch] = useState(true);

  /** 用 copy 充当 fallback, 防止重置时的闪烁现象 */
  const Copy = useRef(component());

  const Component = component;
  return (
  <section key={name}>
    <hgroup className={"inline-hgroup"}>
      <h1>{name.replace(/____/g, " —— ").replace(/__/g, " ").replace(/_/g, ".")}</h1>
      <button onClick={() => { toggleCswitch(false); setTimeout(()=>toggleCswitch(true),10)}}>reload</button>
    </hgroup>
    {cswitch ? <Component /> : Copy.current}
    <br />
  </section>
  );
}