import * as api from  '../api'

export async function signature (ctx, next) {
    const url = ctx.query.url
    console.log(`${JSON.stringify(ctx)}`);
    if (!url) ctx.throw(404)
    const params = await api.getSignatureAsync(url)

    ctx.body = {
        success: true,
        params: params
    }
}