const ejs = require('ejs');

const tpl = `<xml>
        <ToUserName><![CDATA[<%= FromUserName%>]]></ToUserName>
        <FromUserName><![CDATA[<%= ToUserName%>]]></FromUserName>
</xml>`

const tpl2 = '<xml>'
    '<FromUser><![CDATA[<%= FromUserName%>]]></FromUser>'
    '<ToUser><![CDATA[<%= ToUserName%>]]></ToUser>'
'</xml>'

const compiled = ejs.compile(tpl)
const obj = {
    FromUserName: 'Spursyy',
    ToUserName: 'WeChat'
}
const result = compiled(obj)
console.log(`${result}`);