<<template lang="pug">
  .container
    .house-media
        .desc
            .words {{house.words}}
            .name {{house.name}}
    .house-body
        .title {{house.cname}}
        .body {{house.intro }}
        .title 主要角色
        .body(v-for= '(item, index) in house.swornMembers' :key='index')
            .members
                img(:src='item.profile')
                .desc
                    .cname {{item.cname}}
                    .intro {{item.text}}
    .house-history(v-for= '(item, index) in house.sections' :key='index')
        .title {{item.title}}
        .content(v-for='text in item.content') {{text}}
</template>

<script>
import {mapState} from 'vuex'

export default {
        head () {
            return {
                titile: '家族详情'
            }
        },
        computed: {
                ...mapState({
                    house: 'currentHouse'
                })
        },
        beforeCreate () {
            let id = this.$route.query.id
            this.$store.dispatch('showHouse', id)
        }
}
</script>

<style lang="sass" src='~/static/sass/house.sass'>

</style>
