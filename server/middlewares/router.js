import Router from  'koa-router'
import config from '../config'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'
// const wechatMiddle = require('../wechat-lib/middleware');

export const router = app => {
    const router = new Router()
  
    router.all('/wechat-hear', (ctx, next) => {
        wechatMiddle(config.wechat, reply)(ctx, next)
    })
 
    app
        .use(router.routes())
        .use(router.allowedMethods())
}