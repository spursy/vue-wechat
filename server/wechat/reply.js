const tip = 'This is spursy, welcome to my fields\n' + 
    'click <a href = "http://baidu.com"> gogogogo go</a>'

export default async (ctx, next) => {
    const message = ctx.weixin
    if (message.MsgType == 'text') {
        ctx.body = message.Content 
    } else if (message.MsgType == 'image') {
        ctx.body = {
            type: 'image',
            mediaId: message.MediaId
        }
    } else if (message.MsgType == 'voice') {
        ctx.body = {
            type: 'image',
            mediaId: message.MediaId
        }
    } else if (message.MsgType == 'video') {
        ctx.body = {
            title: message.ThumbMediaId,
            type: 'video',
            mediaId: message.MediaId
        }
    } else if (message.MsgType == 'location') {
        ctx.body = message.Location_X + ' : ' + message.Location_Y + ' : ' + message.Label
    } else if (message.MsgType == 'link') {
        ctx.body = message.title
    } 
}