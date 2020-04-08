Function.prototype.myBind = function (ctx) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }

  let self = this;
  let args = Array.prototype.slice.call(arguments, 1);
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      // 最后来说通过 new 的方式， 
      // 在之前的章节中我们学习过如何判断 this， 
      // 对于 new 的情况来说， 不会被任何方式改变 this， 
      // 所以对于这种情况我们需要忽略传入的 this
      return new self(...args, ...arguments)
    }
    return self.apply(ctx, args.concat(...arguments))
  }
}

Function.prototype.myCall = function (obj = window || global) {
  var args = [];
  // 注意i从1开始
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push(arguments[i]);
  };
  obj.fn = this;
  const result = obj.fn(...args.slice(1));
  delete obj.fn;
  return result  
};

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
Function.prototype.myApply = function (obj, arr) {
  // 1.如果 `IsCallable(func)` 是 `false`, 则抛出一个 `TypeError` 异常。
  if (typeof this !== 'function') {
    throw new TypeError(this + ' is not a function');
  }
  // 2.如果 argArray 是 null 或 undefined, 则
  // 返回提供 thisArg 作为 this 值并以空参数列表调用 func 的 [[Call]] 内部方法的结果。
  if (typeof argsArray === 'undefined' || argsArray === null) {
    argsArray = [];
  }
  // 3.如果 Type(argArray) 不是 Object, 则抛出一个 TypeError 异常 .
  if (argsArray !== new Object(argsArray)) {
    throw new TypeError('CreateListFromArrayLike called on non-object');
  }
  if (typeof thisArg === 'undefined' || thisArg === null) {
    // 在外面传入的 thisArg 值会修改并成为 this 值。
    // ES3: thisArg 是 undefined 或 null 时它会被替换成全局对象 浏览器里是window
    thisArg = window || global;
  }
  // ES3: 所有其他值会被应用 ToObject 并将结果作为 this 值，这是第三版引入的更改。
  thisArg = new Object(thisArg);
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
  var result = (new Function(code))(thisArg, __fn, argsArray);
  delete thisArg[__fn];
  if (hasOriginalVal) {
    thisArg[__fn] = originalVal;
  }
  return result;
};