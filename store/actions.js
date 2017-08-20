import Services from './services'

export default {
    getWechatSignature({commit}, url) {
        return ServiceWorkerMessageEvent.getWechatSignature(url)
    }
}