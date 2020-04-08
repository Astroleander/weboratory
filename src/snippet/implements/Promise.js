var PENDING = 'pending';
var REJECTED = 'rejected';
var FULFILLED = 'fulfilled';

function MyPromise (fn) {
  var self = this;
  self.data = null;
  self.status = PENDING;
  self.onFulfilledQueues = [];
  self.onRejectedQueues = [];

  function resolve(value) {
    if (self.status === PENDING) {
      self.status = FULFILLED;
      self.data = value;
      setTimeout(function() {
        for (let i = 0; i < self.onFulfilledQueues.length; i++) {
          self.onFulfilledQueues[i](value);
        }
      })
    }
  }
  function reject(value) {
    if (self.status === PENDING) {
      self.status = REJECTED;
      self.data = value;
      setTimeout(function() {
        for (let i = 0; i < self.onRejectedQueues.length; i++) {
          self.onRejectedQueues[i](value);
        }
      })
    }
  }

  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
MyPromise.prototype.then = function(onFulfilledCallback, onRejectedCallback) {
  var self = this;
  /** chack type */
  onFulfilledCallback = typeof onFulfilledCallback === 'function' ? onFulfilledCallback : function(v) {return v};
  onRejectedCallback = typeof onRejectedCallback === 'function' ? onRejectedCallback : function(v) {return v};
  /** handle then */
  return new MyPromise(function(resolveNext, rejectNext) {
    function resolve(value) {
      try {
        var ret = onFulfilledCallback(value);
        if (ret instanceof MyPromise) {
          ret.then(resolveNext, rejectNext);
        } else {
          resolveNext(ret);
        }
      } catch (e) {
        rejectNext(e);
      }
    }
    function reject(value) {
      try {
        var ret = onRejectedCallback(value);
        if (ret instanceof MyPromise) {
          ret.then(resolveNext, rejectNext);
        } else {
          resolveNext(ret);
        }
      } catch (e) {
        rejectNext(e)
      }
    }
    switch (self.status) {
      case PENDING:
        self.onFulfilledQueues.push(resolve);
        self.onRejectedQueues.push(reject)
        break;
      case FULFILLED:
        resolve(self.data);
        break;
      case REJECTED:
        reject(self.data);
        break;
    }
  })
} 
MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
}
MyPromise.prototype.finally = function (fn) {
  return this.then(
    function(v) { return MyPromise.resolve(fn()).then(function(res) { return v}) },
    function(e) { return MyPromise.resolve(fn()).then(function(res) { throw e}) }
  )
}
MyPromise.resolve = function (value) {
  if (value instanceof MyPromise) {
    return value;
  }
  return new MyPromise((res) => res(value));
}
MyPromise.reject = function (value) {
  if (value instanceof MyPromise) {
    return value;
  }
  return new MyPromise((res, reject) => reject(value));
}
MyPromise.all = function (list) {
  return new MyPromise((resolve, reject) => {
    var values = [];
    var count = 0;
    if (Object.prototype.toString.call(list) !== '[object Array]') {
        console.log(Object.prototype.toString(list))
        reject('Not Supported type');
      }
      for (var i = 0; i < list.length; i++) {
        (function(i) {
          Promise.resolve(list[i]).then(function (res) {
            values[i] = res;
            count ++;
            console.log(i, res, values)
            if (count === list.length) {
              resolve(values)
            }
          }, function(err) {
            reject(err)
          })
        })(i)
      }
  })
}
MyPromise.race = function (list) {
  return new MyPromise((resolve, reject) => {
    if (Object.prototype.toString.call(list) !== '[object Array]') {
      reject('Not Supported type');
    }
    for (var i = 0; i < list.length; i++) {
      (function (i) {
        if (list[i] instanceof MyPromise) {
          list[i].then(res => {
            resolve(res)
          }, err => reject(err))
        } else {
          resolve(list[i])
        }
      })(i)
    }
  })
}

// let p = new MyPromise((resolve) => {
//   setTimeout(()=>{
//     console.log('0')
//     resolve(1)
//   },2000);
// }).then(e => MyPromise.resolve(2)).then(e => {
//   return new MyPromise(resolve => {
//     console.log(e);
//     setTimeout(() => {
//       console.log(3)
//       resolve(4)
//     }, 4000)
//   })
// }).then(e => console.log(e))

MyPromise.all([new MyPromise(r => {
  setTimeout(() => {
    r(5);
  }, 1000)
}), new MyPromise(r => {
  setTimeout(() => {
    r(10);
  }, 2000)
}),MyPromise.resolve(2),3,4]).then((r) => {
  console.log(r)
  console.log('execute finished')
}, (t) => {
  console.log(t)
  console.log('execute error')
})

MyPromise.race([1,2,3,4,5]).then(r=>{
  console.log(r)
}, f => {
  console.log(f)
}).catch(r => console.log(r))

module.exports = MyPromise;

