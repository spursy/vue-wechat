import xml2js from 'xml2js'
import template from './tpl'
import _ from 'lodash'

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
    }

    console.log(`   info >>>  ${JSON.stringify(info)}`);
    return template(info)
}

export {
    formateMessage,
    parseXML,
    tpl
}