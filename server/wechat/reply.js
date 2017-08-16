const tip = 'This is spursy, welcome to my fields\n' + 
    'click <a href = "http://baidu.com"> gogogogo go</a>'

export default async (ctx, next) => {
    const message = ctx.weixin
    console.log(`${message}`)
    ctx.body = tip
}