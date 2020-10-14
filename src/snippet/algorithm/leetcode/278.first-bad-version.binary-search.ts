
/**
 * The knows API is defined in the parent class Relation.
 * isBadVersion(version: number): boolean {
 *     ...
 * };
 */

var solution = function(isBadVersion: any) {

  return function(n: number): number {
    if (n === 1 && isBadVersion(n)) return 1;

    let gap = Math.ceil(n / 2);
    let cur = Math.floor(n / 2);
    
    console.log(cur)
    while (isBadVersion(cur - 1) === isBadVersion(cur)) {
      gap = Math.ceil(gap / 2);
      if (isBadVersion(cur)) {
        cur = cur - Math.floor(gap);
        console.log(cur)
      } else {
        cur = cur + Math.floor(gap);
        console.log(cur)
      }
    }
    return cur;
  };
};

export default {
  solution: (m:number) => {
    const f = solution((n:number) => n > m);
    return f(3999);
  },
  inputs: [1912]

}