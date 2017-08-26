import { getWeChat } from '../wechat'
// Add test.
export async function getSignatureAsync (url) {
    const client = await getWeChat()
    const data = await client.fetchAccessToken() 
    const token = data.access_token
    const ticketData = await client.fetchTicket(token)
    const ticket = ticketData.ticket

    let params = client.sign(ticket, url)  
    params.appId = client.appID

    return params
}

