/**
 * 代理请求
 */
module.exports = app => {
  return async function proxy(ctx, next) {
    await next();
    const result = await ctx.curl(app.host+ctx.url, {
        method: ctx.method,
        headers:ctx.header,
        contentType: ctx.header['content-type'],
        data:  ctx.request.body,
        dataType: 'json'
    })
    ctx.status = result.status;
    ctx.set(result.headers);
    ctx.body = result.data;
  };
};