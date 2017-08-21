import { getWeChat } from '../wechat'

const client = getWeChat()

export async function getSignatureAsync (url) {
    const data = await client.fetchAccesstoken()
    const token = data.access_token
    const ticketData = await client.getTiken(token)
    const ticket = ticketData.ticket

    let params = client.sign(ticket, url)
    params.appId = client.appID

    return params
}

