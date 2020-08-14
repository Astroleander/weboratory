import { useEffect, useRef, useState } from 'react';

export const useInterval = (callback: Function, delay: number|null) => {
  const savedCallback = useRef<Function>(()=>{});
  const id = useRef<NodeJS.Timeout | null>(null);

  /* remember the lastest callback */
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  /* set up the interval */
  useEffect(():any => {
    function tick() {
      savedCallback.current();
    }
    if (delay === null) {
      id.current && clearInterval(id.current);
    } else {
      id.current = setInterval(tick, delay);
    }
    return () => id.current && clearInterval(id.current);
  }, [delay]);
}
