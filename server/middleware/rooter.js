import router from  'koa-router'
import config from '../config'

export const router = app => {
    const router = new router()

    router.get('/wechaty-hear', (ctx, next) => {
        const token = opts.token
        const {
            signature,
            nonce,
            timestamp,
            echostr
        } = ctx.query

        const str = [token, timestamp,  nomce].sort().join('')
        const sha = sha1(str)

        ctx.body = ''
    })

    app.use(router.routers())
    app.use(router.allowMethods())
}