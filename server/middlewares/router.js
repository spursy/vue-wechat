import Router from  'koa-router'
import config from '../config'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'

export const router = app => {
    const router = new Router()  
    router.all('/wechat-hear', async (ctx, next) => {
        await wechatMiddle(config.wechat, reply)(ctx, next)
    })
 
    app
        .use(router.routes())
        .use(router.allowedMethods())
}