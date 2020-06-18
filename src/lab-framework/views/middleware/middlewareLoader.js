import * as MW from './middlewares'

export const middlewaresList = ['stampMiddleware', 'ctxMiddleware', 'logMiddleware',];
export const onion = (resolve, reject) => setTimeout(() => {
    'Heart of Onion'
    resolve();
  }, 100);
/** 
 * 通过归纳演绎法，我们可以得到这么一个逻辑
 * if 有后续函数
 *    await 函数，该函数里的内容是我们期望的next
 * elif 
 *    await 函数，该函数等待核心函数即可
 */
export const InductiveDomain = () => {
  const onionCtx = {des:'i\'m ctx'}
  // 2 后没有，执行内核
  const next_of_2 = async () => await onion();
  // 1 后执行 2, 即 2 是 1 的 next 函数
  const next_of_1 = async () => await MW[middlewaresList[2]](onionCtx, next_of_2);
  // 0 后执行 1, 即 1 是 0 的 next 函数, 同时，
  const next_of_0 = async () => await MW[middlewaresList[1]](onionCtx, next_of_1);
  
  MW[middlewaresList[0]](onionCtx,next_of_0);   
}

export const middlewaresLoader = async (list, core, ctx) => {
  const createNext = (func, next) => async () => await func(ctx, next);
  /** next_of_0 要调用 next_of_1， next_of_1 要调用 next_of_2... 我们需要倒着来 */
  /** 最内层是 core */
  let next = async () => await new Promise((resolve, reject) => {
    core(resolve, reject);
  });
  list.reverse().map((middlewareName) => {    
    console.log(middlewareName, MW[middlewareName])
    next = createNext(MW[middlewareName], next);
  })
  // return await next();
  return next;
}