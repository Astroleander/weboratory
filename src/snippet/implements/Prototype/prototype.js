function A (name) {
  this.name = 'default A' || name;
  this.getName = function() {
    return this.name;
  }
}
A.prototype.getThis = function () {
  return this;
}
A.getThis = function () {
  return this;
}
//////////////////////////////////////////////////////
class B extends A {
  constructor(name) {
    super(name);
    this.b = 'default B' || name
  }
}
///////////////////////////////////////////////////////
function C (name) {
  A.call(this, name)
  this.c = 'default C' || name; 
}
C.__proto__ = A;
C.prototype.__proto__ = A.prototype;
C.prototype.construcor = C;
//////////////////////////////////////////////////////////
// Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。 （请打开浏览器控制台以查看运行结果。）
function D (name) {
  A.call(this, name);
  this.d = 'default D' || name;
}
D.__proto__ = A;
D.prototype = Object.create(A.prototype, {
  construcor: {
    value: D
  }
})
/////////////////////////////////////////////////////////
function E (name) {
  A.call(this, name);
  this.e = 'default e' || name;
}
E.prototype = new A();
E.prototype.construcor = E;
E.__proto__ = A;