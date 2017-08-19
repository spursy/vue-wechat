import sha1 from 'sha1'
import getRawBody from 'raw-body'
import * as util from './util'

export default function (opts, reply) {
    return async function(ctx, next) {
        console.log(`WeChat Module`);
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
                console.log('   Get - Access token validation is successfully.')
                ctx.body = echostr
                return
            } else {
                console.log('Get - Access token validation is failed.')
                ctx.body = 'failed'
            }
        } else if (ctx.method === 'POST') {
            if (sha !== signature) {
                ctx.body = 'Post validation is failed'
                return false
            }

            console.log(`   Post - Access token validation is passed.`);
        }
        
        const data = await getRawBody(ctx.req, {
            length: ctx.length,
            limit: '1mb',
            encoding: ctx.charset
        })
        const content = await util.parseXML (data)  
        const message = await util.formateMessage(content.xml)
        console.log(`   WeChat Response Mes: ${JSON.stringify(message)}`);
        ctx.weixin = message
        // get response body
        await reply.apply(ctx, [ctx, next])
        const replyBody = ctx.body
        const msg = ctx.weixin
        // package reponse xml
        const xml = await util.tpl(replyBody, msg)
        console.log(`${xml}`);
        ctx.status = 200
        ctx.type = 'application/xml'
        ctx.body = xml
    }
}