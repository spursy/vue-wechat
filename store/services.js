import axios from 'axios'

const baseUrl = ''
class Services {
    getWechatSignature (url) {
        return axious.get(`${baseUrl}/wechat-signature?url=${url}`)
    }
}