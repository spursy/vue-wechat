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

var obj = {"ToUserName":["gh_1360a2c99784"],"FromUserName":["oenItv4B3gH_wL_bf7D9Ovlt69Sk"],"CreateTime":["1502978181"],"MsgType":["event"],"Event":["subscribe"],"EventKey":[""]}

var result = formateMessage(obj)

console.log(`${result}`);