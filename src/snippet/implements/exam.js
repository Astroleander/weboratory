Function.prototype.myCall = function(obj = window || global, ...args) {
  if (typeof obj !== 'object') throw 'Object is needed';
  let functionIdf = Symbol('function');
  Reflect.set(obj, functionIdf, this);
  let result = obj[functionIdf](...args);
  Reflect.deleteProperty(obj[functionIdf]);
  return result;
}

function generateFunctionCode(argsArrayLength) {
  var code = 'return arguments[0][arguments[1]](';
  for (var i = 0; i < argsArrayLength; i++) {
    if (i > 0) {
      code += ',';
    }
    code += 'arguments[2][' + i + ']';
  }
  code += ')';
  // return arguments[0][arguments[1]](arg1, arg2, arg3...)
  return code;
}
Function.prototype.myApply = function (thisArg, argsArray) {
  // 1.如果 `IsCallable(func)` 是 `false`, 则抛出一个 `TypeError` 异常。
  if (typeof this !== 'function') {
    throw new TypeError(this + ' is not a function');
  }
  // 2.如果 argArray 是 null 或 undefined, 则
  // 返回提供 thisArg 作为 this 值并以空参数列表调用 func 的 [[Call]] 内部方法的结果。
  if (argsArray === undefined || argsArray === null) {
    argsArray = [];
  }
  var __fn = '__' + new Date().getTime();
  // 万一还是有 先存储一份，删除后，再恢复该值
  var originalVal = thisArg[__fn];
  // 是否有原始值
  var hasOriginalVal = thisArg.hasOwnProperty(__fn);
  thisArg[__fn] = this;
  // 9.提供 `thisArg` 作为 `this` 值并以 `argList` 作为参数列表，调用 `func` 的 `[[Call]]` 内部方法，返回结果。
  // ES6版
  // var result = thisArg[__fn](...args);
  var code = generateFunctionCode(argsArray.length);
  console.log(code, argsArray)
  var result = (new Function(code))(thisArg, __fn, argsArray);
  delete thisArg[__fn];

  if (hasOriginalVal) {
    thisArg[__fn] = originalVal;
  }
  return result;
};

rose = {
  name: 'jack',
}

function yell(a1, a2, a3) {
  console.log('im fly ' + this.name + a1 + a2 + a3);  
}

yell.myCall(rose,1,2,3);
yell.myApply(rose, [1, 2, 3]);
