/**
 * @param x represents the absolute progress of the animation in the bounds of 0
 *          (beginning of the animation) and 1 (end of animation).
 */

const { pow, sin, cos, sqrt, PI } = Math;

export function linear(x: number): number {
  return x;
}

export function easeOutBounce(x: number): number {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
}

export function easeInOutElastic(x: number): number {
  const c5 = (2 * PI) / 4.5;

  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2
    : (pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5)) / 2 + 1;
}

export function easeOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - pow(2, -10 * x);
}

export function easeOutBack(x: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;

  return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
}

export function easeInSine(x: number): number {
  return 1 - cos((x * PI) / 2);
}

export function easeInElastic(x: number): number {
  const c4 = (2 * Math.PI) / 3;

  return x === 0
    ? 0
    : x === 1
    ? 1
    : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
}

export function easeInCirc(x: number): number {
  return 1 - sqrt(1 - pow(x, 2));
}

export function easeInOutQuint(x: number): number {
  return x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2;
}
