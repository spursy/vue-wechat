<template lang = "pug">
  .container
    .house(ref = 'house')
      .items(v-for='(item index) in houses' :key= 'index' @click= 'showHouse(item)')
        .desc
          .words {{item.words}}
          .cname {{item.name}}
          .name {{item.cname}}
  .character
    .title 主要人物
    .section
      .items(v-for='(item, index) in characters'
      .key='index' @click='showCharacter(item)')  
        img(:src= 'item.profile')
        .desc  
          .cname {{item.words}}
          .name {{item.name}}
          .playedBy {{item.cname}}

    .citie
      .city-title 维斯特洛
      .intro 坐落于已知世界的最西端，狭长的大陆
      .items(v-for='(item, index) in cities' : key='index')
        .title{{item.title}}
        .body{{item.body}}
    
</template>

<script>
import {mapState} from 'vuex'
export default {
  head () {
    return {
      title: "冰火脸谱"
    }
  },
  computed: {
    ...mapState([
      'houses',
      'characters',
      'cities'
    ])
  },
  showHouse (item) {
    this.$router.push({
      path: '/house',
      query: {
        id: item._id
      }
    })
  },
  showCharacter (item) {
    this.$router.push({
      path: '/character',
      query: {
        id: item._id
      }
    })
  },
  beforeCreate () {
    this.$store.dispatch('fetchHouses')
    this.$store.dispatch('fetchCharacters')
    this.$store.dispatch('fetchCities')
  }
}
</script>

<style scoped lang = 'sass' src = '~static/sass/index.sass'></style>
