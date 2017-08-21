import xml2js from 'xml2js'
import template from './tpl'
import _ from 'lodash'
import sha1 from 'sha1'

function  parseXML (xml) {
    return new Promise((resolve, reject) => {
        xml2js.parseString(xml, {trim: true}, (err, content) => {
            if (err) reject(err)
            else resolve(content)
        })
    })
}

function formateMessage (result) {
    console.log(`${JSON.stringify(result)}`);
    let message = {}
    if (typeof result === 'object') {
        const keys = Object.keys(result)

        for (let i = 0; i < keys.length; i ++) {
            let item = result[keys[i]]
            let key = keys[i]

            if (!(item instanceof Array) || item.length == 0) {
                continue
            }

            if (item.length == 1) {
                let val = item[0]

                if (typeof val === 'object') {
                    message[key] = formateMessage(val)
                } else {
                    message[key] = (val || '')
                }    
            } else {
                for (let j = 0; j < item.length; j ++) {
                    message[key](formateMessage(item[j]))
                }
            }
        }
    }
    console.log(`${JSON.stringify(message)}`);
    return message
}

function tpl (content, message) {
    let type = 'text'

    if (message.MsgType === 'event' && message.Event === 'subscribe') {
        content = 'Welcome to yiqigo.'
    }
    else if (Array.isArray(content)) {
        type = 'news'
    }

    if (!content) {
        content = 'Empty News.'
    }

    if (content && content.type) {
        type = content.type
    }

    let info = Object.assign({}, {
        content: content,
        createTime: new Date().getTime(),
        msgType: type,
        toUserName: message.FromUserName,
        fromUserName: message.ToUserName
    })
    console.log(`mediaId  >>>>  ${content.mediaId}`);
    if (content.type === 'image'){
        info.mediaId = content.mediaId
    } else if (content.type === 'news') {
        info.content = []
        const article = {
            title: "yiqigo",
            description: "Welcome to yiqigo",
            picUrl: 'http://mmbiz.qpic.cn/mmbiz_jpg/EExKrcN0nhw77scU3p82LjtokkmTxK5bmPIUibTDGOzwVnxYeEpfW9icJMmlVW3EyWibzUBFcOSLJhZvvrmlbkrsg/0',
            url: 'http://baidu.com'
        }
        info.content.push(article)
    }

    console.log(`   info >>>  ${JSON.stringify(info)}`);
    return template(info)
}

function createNonce() {
    return Math.random().toString(36).substr(2, 15)
}

function createTimestamp() {
    return parseInt(new Date().getTime() / 1000, 0) + ''
}

function raw() {
    let keys = Object.keys(args)
    keys = keys.sort()
    let newArgs = {}
        let str = ''

    keys.forEach((key) => {
        newArgs[key.toLowerCase()] = args[key]
    })
    for (let k in newArgs) {
        str += '&' +k+ newArgs[k]
    }
    return str.substr(1)
}

function signIt(nonce, ticket, timestamp, url) {
    const ret = {
        jsapi_ticket: ticket,
        noncestr: nonce,
        timestamp: timestamp,
        url: url
    }

    const string = raw(ret)
    const sha = sha1(string)
    return sha
}

function sign (ticket, url) {
    const nonce = createNonce()
    const timestamp = createTimestamp()
    const signature = signIt(nonce, ticket, timestamp, url)

    return {
        noncestr: noncestr,
        timestamp: timestamp,
        signature: signature
    }
}

export {
    formateMessage,
    parseXML,
    tpl,
    sign
}