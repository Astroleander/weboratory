function throttle(fn, delay) {
  let last, deferTimer
  return function (args) {
    let that = this
    let _args = arguments
    let now = +new Date()
    if (last && now < last + delay) {
      clearTimeout(deferTimer)
      deferTimer = setTimeout(function () {
        last = now
        fn.apply(that, _args)
      }, delay)
    } else {
      last = now
      fn.apply(that, _args)
    }
  }
}

function debounce(fn, delay) {
  return function (args) {
    let that = this
    let _args = args
    clearTimeout(fn.id)
    fn.id = setTimeout(function () {
      fn.call(that, _args)
    }, delay)
  }
}
/**
 * 总结
 * 函数防抖和函数节流都是防止某一时间频繁触发， 但是这两兄弟之间的原理却不一样。
 * 函数防抖是某一段时间内只执行一次， 而函数节流是间隔时间执行。
 * 
 * 结合应用场景
 * 
 * debounce
 * 
 * search搜索联想， 用户在不断输入值时， 用防抖来节约请求资源。
 * window触发resize的时候， 不断的调整浏览器窗口大小会不断的触发这个事件， 用防抖来让其只触发一次
 * 
 * 
 * throttle
 * 
 * 鼠标不断点击触发， mousedown(单位时间内只触发一次)
 * 监听滚动事件， 比如是否滑到底部自动加载更多， 用throttle来判断
 */