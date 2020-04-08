/** 拷贝其他引用类型、拷贝函数、循环引用等情况 */
function Clone1 (obj) {
  return JSON.parse(JSON.stringify(obj))
}

/** 层数问题 */
function Clone2 (obj) {
  let target = {};
  for (const key in obj) {
    target[key] = obj[key]
  }
  return target;
}

/** 递归解决深度问题 */
function Clone3 (obj) {
  if (typeof obj === 'object') {
    let target = {};
    for (const key in object) {
      target[key] = Clone3(obj[key])
    }
    return target
  } else {
    return obj
  }
}

/** 支持数组 */
function Clone4 (obj) {
  if (typeof obj === 'object') {
    let target = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
      target[key] = Clone4(obj[key])
    }
    return target;
  } else {
    return obj;
  }
}

/** 循环计数 */
function Clone5 (obj, map = new Map()) {
  if (typeof obj === 'obj') {
    let target = Array.isArray(obj) ? [] : {};
    if (map.has(obj)) return obj;
    map.set(obj, target);
    for (const key in obj) {
      target[key] = Clone5(object[key], map);
    }
    return target;
  }
  return obj;
}

/** WeakMap 减去引用 */
function Clone6(obj, map = new WeakMap()) {
  if (typeof obj === 'object') {
    let target = Array.isArray(obj) ? [] : {};
    if (map.get(obj)) return obj;
    map.set(obj, target);
    for (const key in obj) {
      target[key] = Clone6(obj[key])
    }
    return target;
  } else {
    return obj;
  }
}

/** 使用 while 优化性能 */
function forEach(keys, iteratee) {
  let index = -1;
  const length = keys.length;
  while (++index < length) {
    iteratee(keys[index], index)
  }
  return Array;
}
function Clone(obj, map = new WeakMap()) {
  if (typeof obj === 'object') {
    const isArray = Array.isArray(obj);
    let target = isArray ? [] : {};
    if (map.get(obj)) return obj;
    map.set(obj, target);
    const keys = isArray ? obj : Object.keys(obj);
    forEach(keys, (value, key) => {
      if(keys) { key = value };
      target[key] = Clone(obj[key], map);
    })
    return target;
  } else {
    return obj;
  }
}

class Address {
  constructor(path) {
    this.path = path
  }
}
class Person {
  constructor(name, age, path, hasParent) {
    this.name = name;
    this.age = age;
    this.match = [1,2,3,1,2];
    if (hasParent) {
      this.family = new Person(name + 1, age * 10, path, age > 1000 ? false : true)
    }
    this.Address = new Address(path);
  }
}

let ori = new Person('bigbob', 15, 'Xitucheng No.10', true);
ori.target = ori;
let c = Clone(ori)
console.log(c)