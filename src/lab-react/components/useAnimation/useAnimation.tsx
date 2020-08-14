import { useRef, useEffect, useState } from "react";
import { useTimer, useTimerLazy } from "./useTimer";

const TARGET_FPS = 60;

/**
 * @param callback
 * @param duration
 * @param ease
 */
export const useAnimationFrame = (
  duration: number,
  delay: number,
  ease: (x: number) => number,
  callback: (time: number[]) => void = () => {},
) => {
  const timer = useTimerLazy(1000 / TARGET_FPS, duration + delay);
  const [tick, setTick] = useState<number>(0);
  /**
   * f(v) = ease(x),
   *
   * [notice] v cannot be used to stop animation
   * due to some v of ease function reach 1 many times
   */
  const x = timer < delay ? 0 : (timer - delay) / duration;
  const v = x > 1 ? 1 : ease(x);

  /** the instance of requestAnimationFrame */
  const requestRef = useRef<number>();

  /** the interval the last-time being called */
  const previousTimeRef = useRef<number>(0);

  /** animate calling loop, break when timeout */
  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - (previousTimeRef.current || 0);
      if (deltaTime > 1000 / TARGET_FPS) {
        callback([deltaTime, timer, v]);
        setTick((p) => p + 1);
        previousTimeRef.current = time;
      }
    }
    if (timer < duration + delay) {
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect((): any => {
    /**
     * 由于需要更改动画所依赖的的参数(条件)，我们是不能保证 useEffect 第二个参数为空的,
     * 所以实质上无法确保 useEffect 只执行一次，
     * 必须手动在内部确保动画循环函数(requestAnimationFrame)只被调用一次
     */
    if (timer < duration + delay) {
      /** 执行函数, 并拿到第一次引用 */
      requestRef.current = requestAnimationFrame(animate);
    } else {
      requestRef.current && cancelAnimationFrame(requestRef.current);
    }
    /** requestRef 是回收内存的保证 */
    return () => requestRef.current && cancelAnimationFrame(requestRef.current);
  }, [timer < duration + delay]);

  return v;
};

export const useAnimationTimer = (
  duration: number,
  delay: number,
  ease: (x: number) => number,
  callback: (time: number[]) => void = () => {},
) => {
  /** timer that updating default as 60 fps */
  const timer = useTimer(1000 / TARGET_FPS, duration + delay);
  const previousTimeRef = useRef<number>(0);

  /**
   * f(v) = ease(x),
   *
   * [notice] v cannot be used to stop animation
   * due to some v of ease function reach 1 many times
   */
  const x = timer < delay ? 0 : (timer - delay) / duration;
  const v = x > 1 ? 1 : ease(x);

  if (previousTimeRef.current) {
    const deltaTime = timer - previousTimeRef.current;
    callback([deltaTime, timer, v]);
  }
  previousTimeRef.current = timer;
  return v;
};

/** 默认使用 requestAnimationFrame 版本 */
export const useAnimation = useAnimationFrame;
