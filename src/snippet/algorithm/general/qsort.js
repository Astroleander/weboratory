function partition(arr, low, high) {
  let pivot = arr[~~((low + high) /2)];
  let i = low;
  let j = high;
  while (i <= j) {
    while(arr[i] < pivot) {
      i++;
    }
    while(arr[j] > pivot) {
      j--;
    }
    if (i <= j) {
      console.log(
        `p_v: ${pivot}, low: ${low}, high: ${high} `,
        arr, 
        i, j);
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    }
  }
  console.log(arr, arr.slice(low, i), arr.slice(i, high))
  return i;
}

/**
 * 
 * @param {*} arr 数组
 * @param {*} low  起始下标
 * @param {*} high  结束下标 + 1
 */
function qsort(arr, low = 0, high = arr.length - 1) {
  if (arr.length > 1) {
    let index = partition(arr, low, high);
    // console.log(index)
    if (low < index - 1) {
      qsort(arr, low, index - 1);      
    }
    if (index < high) {
      qsort(arr, index, high)
    }
  }
  return arr;
}

let q = qsort([1,3,8,6,2,1,5,6])
console.log(q);