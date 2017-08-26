<template lang = "pug">
  #app
    #main
      nuxt
    v-nav
  <div>
    <nuxt/>
    <my-footer/>
  </div>
</template>

<script>
import nNav from '~components/nav.vue'

export default {
  components: {
    nNav
  }
}
</script>
