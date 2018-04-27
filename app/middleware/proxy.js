/**
 * 代理请求
 */
module.exports = app => {
  return async function proxy(ctx, next) {
    await next();
    let url = ctx.url;
    if(app.cover){
        let splitData = url.split('/');
        let newData = splitData.splice(2,splitData.length)
        url = '/' + newData.join('/')
    }
    console.dir(`${url}==>${app.host+url}`)

    const result = await ctx.curl(app.host+url, {
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
