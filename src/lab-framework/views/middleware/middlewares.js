export const stampMiddleware = async (ctx, next) => {
  const start = Date.now();
  await next();
  const end = Date.now();
  console.log('time flip by ---- ', end - start)
}

export const logMiddleware = async (ctx, next) => {
  console.log('[exec start...]')
  await next();
  console.log('[executed!...]')
}

export const ctxMiddleware = async (ctx, next) => {
  console.log('[ctx]' + ctx ? ctx : 'nothing in ctx');
  await next();
  console.log('[ctx]' + ctx ? ctx : 'still nothing in ctx');
}