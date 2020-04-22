'use strict'
// var fixed2 = Object.freeze({c:2});
// console.log(Object.isFrozen(fixed2));
// console.log(Object.isSealed(fixed2));
// console.log(Object.isExtensible(fixed2));
// console.log(Object.getOwnPropertyDescriptors(fixed2));

// console.log('===========================')

// var fixed = Object.seal({ c: 2 });
// fixed.c = 3;
// console.log(fixed.c)
// Object.defineProperty(fixed, "c2", { writable: false });

// var fixed = {c:2};
// console.log(Object.isFrozen(fixed));
// console.log(Object.isSealed(fixed));
// console.log(Object.isExtensible(fixed));
// console.log(Object.getOwnPropertyDescriptors(fixed));
// Object.defineProperty(fixed, 'c2', {'writable': false});
// console.log("===========================");

var fixed3 = Object.preventExtensions({c:2});
fixed3.__proto__ = null;
// console.log(Object.isFrozen(fixed3));
// console.log(Object.isSealed(fixed3));
// console.log(Object.isExtensible(fixed3));
// console.log(Object.getOwnPropertyDescriptors(fixed3));
