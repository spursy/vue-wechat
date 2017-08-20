import request from 'request-promise'
import fs from 'fs'
import _ from 'lodash'
import { sign } from './util'

// &appid=APPID&secret=APPSECRET
const base = 'https://api.weixin.qq.com/cgi-bin/'
const api = {
    accessToken:  base + 'token?grant_type=client_credential',
    temporary: {
        addMaterials: base + 'media/upload?',
        featchMaterials: base + 'media/get?'
    },
    permanent: {
        addNewsMaterials: base + 'material/add_news?', 
        //for news message
        addPicsMaterials: base + 'media/uploadimg?',
        addOthersMaterials: base + 'material/add_material?',
        featchMaterials: base + 'material/get_material?',
        deleteMaterials: base + 'material/del_material?',
        updateNews: base + 'material/update_news?',
        getMaterialsCount: base + 'material/get_materialcount?',
        batchMaterails: base + 'material/batchget_material?'
    },
    ticket: {
        get: base + 'ticket/getticket?'
    }
}

export default class WeChat {
    constructor(opts) {
        this.opts = Object.assign({}, opts)

        this.appID = opts.appID
        this.appSecret = opts.appSecret
        this.getAccessToken = opts.getAccessToken
        this.saveAccessToken = opts.saveAccessToken
        this.getTicket = opts.getTicket
        this.saveTicket = opts.saveTicket

        this.fetchAccessToken()
    }

    async request (options) {
        options = Object.assign({}, options, {json: true})

        try {
            const response = await request(options)
            return response
        } catch(error ) {
            console.error(error);
        }
    }

    async fetchAccessToken () {
        let data = await this.getAccessToken()

        if (!this.isValidToken(data, 'access_token')) {
            data =  await this.updateAccessToken()
        }
        console.log(`123231${JSON.stringify(data)}`);
        await this.saveAccessToken(data)
        return data
    }

    async fetchTiket () {
        let data = await this.getTicket()

        if (!this.isValidToken(data, 'ticket')) {
            data =  await this.updateTicket(token)
        }
        console.log(`123231${JSON.stringify(data)}`);
        await this.saveTicket(data)
        return data
    }

    async updateAccessToken () {
        const url = api.accessToken + '&appid=' + this.appID + '&secret=' + this.appSecret
        const data = await this.request({url: url})

        const now = (new Date().getTime())
        const expiresIn = now + (data.expires_in - 20 ) * 1000
        data.expires_in = expiresIn
        return data
    }

    async updateTicket (token) {
        const url = api.ticket.get + '&access_token=' + token + '&type=jsapi'
        const data = await this.request({url: url})

        const now = (new Date().getTime())
        const expiresIn = now + (data.expires_in - 20 ) * 1000
        data.expires_in = expiresIn
        return data
    }

    isValidToken (data, name) {
        if (!data || !data[name] || !data.expires_in) {
            return false
        }

        const expiresIn = data.expires_in
        const now = (new Date().getTime())

        if (now < expiresIn) {
            return true
        } else {
            return false
        }
    }

    async handle (operation, ...args) {
        const tokenData = await this.fetchAccessToken()
        console.log(`handel + ${JSON.stringify(tokenData)}`);
        const options = await this[operation](tokenData.access_token, ...args)
        const data = await this.request(options)
        return data
    }

    async uploadMaterials(token, type, materials, pernanent) {
        let form = {}
        let url = ''
        if (pernanent) {
            url = api.permanent.addOthersMaterials
        } else {
            url = api.temporary.addMaterials
        }        
        form.media =await fs.createReadStream(materials)

        let uploadUrl = url + 'access_token=' +  token
        uploadUrl += '&type=' + type

        const options = {
            method: 'POST',
            url: uploadUrl,
            json: true
        }

        if (type === 'news') {
            options.body = form
        } else {
            options.formData = form
        }
        return options
    }

    async uploadNewsMaterials(token) {
        let form = {}
        let url = api.permanent.addNewsMaterials
        var obj = {
                "articles": [{
                "title": "Welocme to yiqigo",
                "thumb_media_id":"cEn1jwnodDYTi0fFJEOMIDrzATPQdDmbsylqoRnXhtg",
                "author": "Spursyy",
                "digest": "Welcome to my home.",
                "show_cover_pic": 1,
                "content": "today is bemjdaljljkjkl",
                "content_source_url": "Http://baidu.com"
            },
            //若新增的是多图文素材，则此处应还有几段articles结构
        ]}
        let uploadUrl = url + 'access_token=' +  token
        _.extend(form, obj)
        const options = {
            method: 'POST',
            url: uploadUrl,
            json: true
        }
        options.body = form
        return options
    }

    sign (ticket, url) {
        return sign(ticket, url)
    }
}