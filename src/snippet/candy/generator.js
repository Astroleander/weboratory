function * factory () {
  yield 1
  yield typeof this === 'object'
  yield 3
  yield function() {
    return 4
  }
  yield () => 5
  yield new Promise((resolve, reject) => {
    setTimeout(resolve(6), 2000)
  })
  yield 7
}

let g = factory();
console.log(g.next())
console.log(factory().next())
console.log(factory().next())
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next())