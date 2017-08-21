import mongoose from 'mongoose'
import config from '../config'
import Wechat from '../wechat-lib'

const Token = mongoose.model('Token')
const Ticket = mongoose.model('Ticket')
const wechatConfig = {
    wechat: {
        appID: config.wechat.appID,
        appSecret: config.wechat.appSecret,
        token: config.wechat.token,
        getAccessToken: async () => await Token.getAccessToken(),
        saveAccessToken: async (data) => await Token.saveAccessToken(data),
        getTiken: async () => await Ticket.getTiken(),
        saveTiken: async (data) => await Ticket.saveTiken(data)
    }
}

export const getWeChat = async () => {
    const wechatClient = await new Wechat(wechatConfig.wechat)
    return wechatClient
}

