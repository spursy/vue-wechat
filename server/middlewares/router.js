import Router from  'koa-router'
import config from '../config'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'
import path from 'path'
import { signature } from '../controllers/wechat'

var se = '12'
export const router = app => {
    const router = new Router()  
    router.all('/wechat-hear', async (ctx, next) => {
        await wechatMiddle(config.wechat, reply)(ctx, next)
    })

    router.all('/wechat-signature', async (ctx, next) => {
        await signature(ctx, next)
    })

    router.get('/upload', async(ctx, next) => {
        let Wechat = require('../wechat')
        let client = await Wechat.getWeChat()
        console.log(`upload upload upload`);   
        // upload temporary image.
        // const data = await client.handle('uploadMaterials', 'image', path.resolve(__dirname ,'../../static/materials/handsome.jpg'), true)
        const data = await client.handle('uploadNewsMaterials')
        ctx.body = JSON.stringify(data)
    })
 
    app
        .use(router.routes())
        .use(router.allowedMethods())
}