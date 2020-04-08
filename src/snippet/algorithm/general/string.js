function BF(src, dest) {
  let len1 = src.length,
    len2 = dest.length;
  let i = 0,
    j = 0;
  while (i < len1 && j < len2) {
    if (src[i] === dest[j]) {
      i++;
      j++;
    } else {
      i = i - j + 1;
      j = 0;
    }
  }
  if (j === len2) {
    return i - j;
  }
  return -1;
}

function getNext(str) {
  let res = [];
  let k = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    if (i === 0) {
      res.push(0);
      continue;
    }
    while (k > 0 && str[i] !== str[k]) {
      k = res[k - 1];
    }
    if (str[i] === str[k]) {
      k++;
    }
    res[i] = k;
  }
  return res;
}
function KMP(src, dest) {
  let next = getNext(dest);
  let len1 = src.length,
    len2 = dest.length;
  let i = 0,
    j = 0;
  while (i < len1 && j < len2) {
    if (src[i] === dest[j]) {
      i++;
      j++;
    } else {
      i = i - next[j] + 1;
      j = 0;
    }
  }
  if (j === len2) {
    return i - j;
  }
  return -1;
}