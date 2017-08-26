<template lang = "pug">
  .container
</template>
<script>
import {mapState} from 'vuex'

export default {
  asyncData ({ req }) {
    return {
      name: req ? 'server' : 'client'
    }
  },
  head () {
    return {
      title: `Test UI page`
    }
  }, 
  beforeMount () {
    const wx = window.wx
    const url = window.location.href

    this.$store.dispatch('getWechatSignature', url)
        .then(res => {
            if (res.data.success) {
              const params = res.data.params

              wx.config({
                debug: true,
                appId: params.appId,
                timestamp: params.timestamp,
                nonceStr: params.noncestr,
                signature: params.signature,
                jsApiList: [
                  'chooseImage',
                  'previewImage',
                  'uploadImage',
                  'downloadImage',
                  'onMenuShareTimeLine',
                  'hideAllNonBaseMenuItem',
                  'showMenuItems'
                ]
              })

              wx.ready(() => {
                wx.hideAllNonBaseMenuItem()
                console.log(`success`);
              })

            }
        })
  }
}
</script>


