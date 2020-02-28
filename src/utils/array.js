const ArrayUtils = {
  shuffle(array) {
    return array
  },

  randomSelect(array, n = 1) {
    let m = array.length;
    let select = [];
    if (m < n) return array;
    for (const each in array) {
      if (n === 0) break;
      else if (Math.random() < n / m) {
        select.push(array[each])
        n--;
      }
      m--;
    }
    return select;
  }
}
export default ArrayUtils
// let a = [1, 3, 5, 6, 7, 8, 9, 11, 13, 134]
// let statistics = {}
// for (each in Array(100).fill(0)) {
//   let c = ArrayUtils.randomSelect(a, 3)
//   c.forEach(ret => {
//     console.log(statistics, statistics[ret])
//     if (statistics[ret] !== undefined) statistics[ret] += 1;
//     else statistics[ret] = 0;
//   });
// }
// console.log(statistics)