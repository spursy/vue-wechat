import sha1 from 'sha1'
import getRawBody from 'raw-body'
import * as util from './util'

export default  function (opts, reply) {
    console.log(`13131313344444441`);
    return async function wechatMiddle(ctx, next) {
        const token = opts.token
        const {
            signature,
            nonce,
            timestamp,
            echostr
        } = ctx.query

        console.log(`1313131331`);
        const str = [token, timestamp,  nonce].sort().join('')
        const sha = sha1(str)

        if (ctx.method === 'GET') {
            if (sha === signature) {
                console.log('access token validation is passed.')
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
        // const message = util.formatMessage(content.xml)
        console.log(`${JSON.stringify(content)}`);

        ctx.weixin = {}
        // message

        await reply.apply(ctx, [ctx, next])

        const replyBody = ctx.body
        const msg = ctx.weixin
        // const xml = util.tpl(replyBody, msg)
        console.log(`${JSON.stringify(replyBody)}`);

        const xml = `<xml>
                         <ToUserName><![CDATA[toUser]]></ToUserName>
                         <FromUserName><![CDATA[fromUser]]></FromUserName>
                         <CreateTime>12345678</CreateTime>
                         <MsgType><![CDATA[text]]></MsgType>
                         <Content><![CDATA[你好]]></Content>
                         </xml>`

        ctx.status = 200
        ctx.type = 'application/xml'
        ctx.body = xml
    }
}