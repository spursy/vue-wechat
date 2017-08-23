import axios from 'axios'

const baseUrl = ''
const apiUrl = 'hhtp://rap.taobao.org/mockjsdata/21639/'
class Services {
    getWechatSignature (url) {
        return axios.get(`${baseUrl}/wechat-signature?url=${url}`)
    }

    getUserByOAuth (url) {
        return axios.get(`${baseUrl}/wechat-oauth?url=${url}`)
    }

    fetchHouses (url) {
        return axios.get(`${apiUrl}/wiki/houses`)
    }

    fetchCities (url) {
        return axios.get(`${apiUrl}/wiki/cities`)
    }

    fetchCharacters (url) {
        return axios.get(`${apiUrl}/wiki/characters`)
    }
}

export default new Services()