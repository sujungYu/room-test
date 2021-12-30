<template>
  <div>
      <h1>{{roomTitle}}</h1>
      <ul>
          <li v-for="user in users" v-bind:key="user">
             <h2>{{user}}</h2>
          </li>
      </ul>
      <Invite/>
  </div>
</template>

<script>
import Invite from './Invite.vue'
export default {
    components: {
       Invite 
    },
    data() {
        return {
            users: [],
            id: null
        }
    },
    // props: [
    //     'id'
    // ],
    created() {
        this.id = this.$route.params.id
        this.$store.dispatch('setRoomName', this.id)
        this.$store.dispatch('setRoomUser', this.id)
        this.users = this.roomMembers
    },
    computed: {
        roomTitle() {
            return this.$store.getters.roomTitle
        },
        roomMembers() {
            return this.$store.getters.roomMembers
        }
    }
}
</script>

<style>

</style>