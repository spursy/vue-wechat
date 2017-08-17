import ejs from 'ejs'

const tpl = `
    <xml>
        <ToUserName><![CDATA[<%= fromUserName%>]]></ToUserName>
        <FromUserName><![CDATA[<%= toUserName%>]]></FromUserName>
        <CreateTime><%= createTime%></CreateTime>
        <MsgType><![CDATA[<%= msgType%>]]></MsgType>
        
        <% if (msgType == 'text') {%>
            <Content><![CDATA[<%= content.content%>]]></Content>
        <%= } else if (msgType == 'image') {%>
            <Image>
                <MediaId><![CDATA[<%= content.mediaID%>]]></MediaId>
            </Image>
        <%= } else if (msgType == 'voice') {%>
            <Voice>
                <MediaId><![CDATA[<%= content.mediaID%>]]></MediaId>
            </Voice>
        <%= } else if (msgType == 'video') {%>
            <Video>
                <MediaId><![CDATA[<%= content.mediaID%>]]></MediaId>
                <Title><![CDATA[<%= content.title%>]]></Title>
                <Description><![CDATA[<%= content.description%>]]></Description>
            </Video> 
        <%= }  else if (msgType == 'music') {%>
            <Music>
                <Title><![CDATA[<%= content.title%>]]></Title>
                <Description><![CDATA[<%= content.description%>]]></Description>
                <MusicUrl><![CDATA[<%= content.musicUrl%>]]></MusicUrl>
                <HQMusicUrl><![CDATA[<%= content.hqMusicUrl%>]]></HQMusicUrl>
                <ThumbMediaId><![CDATA[<%= content.mediaID%>]]></ThumbMediaId>
            </Music>
        <%= }  else if (msgType == 'news') {%>
            <ArticleCount><%= content.length%></ArticleCount>
            <Articles>
                <%= content.forEach(function() {%>
                    <item>
                        <Title><![CDATA[<%= item.title%>]]></Title>
                        <Description><![CDATA[<%= item.descritpion%>]]></Description>
                        <PicUrl><![CDATA[<%= item.picUrl%>]]></PicUrl>
                        <Url><![CDATA[<%= url%>]]></Url>
                    </item>
                <%= })%>
            </Articles>
        <%= }%>
    </xml>
`
const compiled = ejs.compile(tpl)
export default compiled