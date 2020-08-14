import { useRef,useState } from "react";
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