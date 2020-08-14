import { useTimer } from './useTimer';
import { useRef } from 'react';
import { Eases } from '.';

const TARGET_FPS = 120;

/**
 * RELIC IMPLEMENTION
 */
type TUseAnimation = (during: number, delay:number, ease?:(x:number) => number, max_fps?: number, callback?: (x:number) => any) => number;
export const useAnimationTimer: TUseAnimation = (
  duration: number,
  delay: number,
  ease = Eases.easeOutBack,
  max_fps = 1000/TARGET_FPS,
  callback = () => {},
) => {
  /** timer that updating default as 60 fps */
  const timer = useTimer(1000 / max_fps, duration + delay);
  const previousTimeRef = useRef<number>(0);

  /**
   * f(v) = ease(x),
   *
   * [ notice ] v cannot be used to stop animation
   * due to some v of ease function reach 1 many times
   */
  const x = timer < delay ? 0 : (timer - delay) / duration;
  const y = x > 1 ? 1 : ease(x);

  if (previousTimeRef.current) {
    const deltaTime = timer - previousTimeRef.current;
    callback(x);
  }
  previousTimeRef.current = timer;
  return y;
};
