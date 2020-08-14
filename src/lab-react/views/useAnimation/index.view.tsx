import { useAnimationTimer, useAnimationFrame } from "../../components/useAnimation";
import React, { PropsWithChildren, useEffect } from "react";

interface AnimationController {
  duration: number;
  delay: number;
  ease: (x: number) => number;
}

const AnimationWrapper = ({
  children,
  duration,
  delay,
  ease,
}: PropsWithChildren<AnimationController>) => {
  let v = useAnimationTimer(duration, delay, ease);
  let v2 = useAnimationFrame(duration, delay, ease);

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
