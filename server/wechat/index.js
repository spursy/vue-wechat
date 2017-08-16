import mongoose from 'mongoose'
import config from '../config'
import Wechat from '../wechat-lib'

const Token = require('../middlewares/schema')

const wechatConfig = {
    wechat: {
        appID: config.wechat.appID,
        appSecret: config.wechat.appSecret,
        token: config.wechat.token,
        getAccessToken: async () => await Token.getAccessToken(),
        saveAccessToken: async (data) => await Token.saveAccessToken(data)
    }
}

export const getWeChat = () => {
    const wechatClient = new Wechat(wechatConfig.wechat)
    return wechatClient
}

getWeChat()

