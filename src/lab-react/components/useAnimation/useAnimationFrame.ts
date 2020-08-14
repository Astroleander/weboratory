import { useRef, useState, useEffect } from 'react';
import { Eases } from '.';

const TARGET_FPS = 120;

type TUseAnimation = (during: number, delay:number, ease?:(x:number) => number, max_fps?: number, callback?: (x:number) => any) => number;
export const useAnimationFrame:TUseAnimation = (
  during:number, 
  delay:number, 
  ease = Eases.easeOutExpo, 
  max_fps = TARGET_FPS,
  callback = () => {}
) => {
  /** proformance.now() 返回的值是当前页面 */
  let initTime = useRef<DOMHighResTimeStamp>(0);
  /** 上次调用的时间 */
  let lastTime = useRef<number | null>(null);
  /** 持有函数引用 */
  let rAF = useRef<number | null>(null);

  const tik = 1000 / max_fps;
  const [v, setV] = useState<number>(0);

  let render = useRef<(t:DOMHighResTimeStamp) => void>(
    (_timestamp:DOMHighResTimeStamp) => {
      let time = initTime.current && _timestamp - (initTime.current || 0);
      /** period delay --- */
      if (time < delay) {
        requestAnimationFrame(render.current)
        return;
      };
      /** 距离上次调用的时间增量, △t = lastCalled - _timestemp */
      let delta = time - (lastTime.current || delay);
      let x = (time - delay) / during;
      if (delta > tik) {
        lastTime.current = time;
        callback(x);
        setV(ease(x));
      }
      rAF.current = requestAnimationFrame(render.current);
      /** 这里很蠢, 你要想拿到下一个要执行的 requestAnimationFrame 就必须把在赋值放置在调用后*/      
      if (x > 1) {
        /** 动画在 x > 1 后收拢 */
        setV(ease(1));
        cancelAnimationFrame(rAF.current)
        rAF.current = null
      }
    }
  );
  useEffect(() => {
    initTime.current = performance.now();
    rAF.current = requestAnimationFrame(render.current);
  }, []);

  return v;
}