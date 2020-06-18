const log = function (...args) {
  console.log('[middleware][log]', ...args)
}
export const stampMiddleware = async (ctx, next) => {
  const start = Date.now();
  await next();
  const end = Date.now();
  log('[timestamp] time pass by ---- ', end - start)
}

export const logMiddleware = async (ctx, next) => {
  log('[log] exec start...')
  await next();
  log('[log] executed!...')
}

export const ctxMiddleware = async (ctx, next) => {
  log('[ctx]' + (ctx ? ctx : 'nothing in ctx'));
  await next();
  log('[ctx]' + (ctx ? ctx : 'still nothing in ctx'));
}