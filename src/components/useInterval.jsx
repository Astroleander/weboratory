import React, { useState, useEffect, useRef } from 'react';

const useInterval = (callback, delay) => {
  const savedCallback = useRef();
  /* remember the lastest callback */
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  /* set up the interval */
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;