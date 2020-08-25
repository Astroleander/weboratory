import { useAnimationTimer, useAnimationFrame } from "../../components/useAnimation";
import React, { PropsWithChildren } from "react";

interface AnimationController {
  duration: number;
  delay: number;
  ease?: (x: number) => number;
  max_fps?: number;
  callback?: (x: number) => void;
}

const AnimationWrapper = ({
  children,
  duration,
  delay,
  ease,
  max_fps
}: PropsWithChildren<AnimationController>) => {
  let v = useAnimationTimer(duration, delay, ease, max_fps);
  let v2 = useAnimationFrame(duration, delay, ease, max_fps);

  return (
    <div style={{
      display: "inline-block",
      margin: '10px'
    }}>
      <div style={{
        display: "inline-block",
        transform: `scaleY(${v})`,
        transformOrigin: `50% 0%`,
      }}>
        {children}
      </div>
      <div style={{
        display: "inline-block",
        transform: `scaleY(${v2})`,
        transformOrigin: `50% 0%`,
      }}>
        {children}
      </div>
    </div>
  );
};

export default AnimationWrapper;
