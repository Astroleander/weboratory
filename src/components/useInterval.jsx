import React, { useState, useEffect, useRef } from 'react';

const useInterval = (callback, delay) => {
  const savedCallback = useRef();
  /* remember the lastest callback */
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  /* set up the interval */
  useEffect(() => {
    console.log('delay changed!',delay)
    function tick() {
      savedCallback.current();
    }
    let id;
    if (delay === null) {
      clearInterval(id)
    } else {
      id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;