import sha1 from 'sha1'
import getRawBody from 'raw-body'
import * as util from './util'

export default  function (opts, reply) {
    return async function(ctx, next) {
        console.log(`1.0 wechat module`);
        const token = opts.token
        const {
            signature,
            nonce,
            timestamp, 
            echostr
        } = ctx.query

        const str = [token, timestamp,  nonce].sort().join('')
        const sha = sha1(str)

        if (ctx.method === 'GET') {
            if (sha === signature) {
                console.log('2.0 access token validation is passed.')
                ctx.body = echostr
            } else {
                console.log('false')
                ctx.body = 'failed'
            }
        } else if (ctx.method === 'POST') {
            if (sha !== signature) {
                ctx.body = 'Failed'
                return false
            }
        }
        const data = await getRawBody(ctx.req, {
            length: ctx.length,
            limit: '1mb',
            encoding: ctx.charset
        })
        const content = await util.parseXML (data)
        const message = await util.formateMessage(content.xml)
        ctx.weixin = message

        await reply.apply(ctx, [ctx, next])
        const replyBody = ctx.body
   
        const msg = ctx.weixin
        const xml = await util.tpl(replyBody, msg)
        console.log(`2222222222${JSON.stringify(xml)}`);

        ctx.status = 200
        ctx.type = 'application/xml'
        console.log(`11111111111111111111111111`);
        ctx.body = xml
    }
}