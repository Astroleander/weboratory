import { useRef,useState,useEffect } from "react";
import { useInterval } from './useInterval';

/**
 * 启动一个伴随组件生命周期的定时器, 其每一帧都会触发组件重绘
 * @param {number} tik 动画帧间隔 
 * @param {number} timeout 动画持续时间
 */
// useState version
export const useTimer = (tik:number, timeout:number) => {
  const delay = useRef<number|null>(tik);
  const [timer, setTimer] = useState<number>(0);
  
  useInterval(() => setTimer(p => p + tik), delay.current);
  /** useTimer 的更新就是由它自己控制的, 它一定会更新到最新值 */
  /** 实质上你不能在这里 setTimer, 否则会反复触发更新导致错误 */
  if (timeout <= timer) {
    delay.current = null;
  };
  return timer;
}

// useRef version
export const useTimerLazy = (tik:number, timeout:number) => {
  const timer = useRef<number>(0);
  const delay = useRef<number|null>(tik);
  
  useInterval(() => timer.current += tik, delay.current);

  /** 
   * useTimerLazy 实际上是受控的, 外部更新来的时候它才会返回新的值, 在 useAnimationFrame 里我们可以发
   * 现 
   * 1. tick 触发的方式是 delta > interval 时才触发一次页面更新, 
   * 2. 但是触发更新到下一次更新是有间隔的, 
   *    下一次更新拿到的 timer 已经较上一次触发更晚了
   * 3. 此时如果 timer > timeout 时是不会触发最后一次的 animate 的, 最后一个 setTick 不会被应用
   */
  if (timeout <= timer.current) {
    delay.current = null;
    timer.current += tik;
  } else {
  }
  return timer.current;
}
