<template>
  <div>
      <div class="top">
          offco
          <i class="fas fa-arrow-left"></i>
      </div>
        <div class="back">
          <h1>{{roomTitle}}</h1>
          <hr style= "width:81vw; height:1px; border:none; background-color:rgb(162, 210, 255); margin-bottom:6vh">
          <ul>
          <li v-for="user in users" v-bind:key="user">
             <h2>
                 <i class="far fa-square square"></i>{{user}}
             </h2>
          </li>
      </ul>
          <!-- <i class="fas fa-plus-circle createroom" ></i> -->
      </div>
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

<style scoped>
div {
    margin: 0 auto;
    font-size: 10px;
    background-color: rgb(254, 249, 239);
    text-align: center;
    width : 100vw;
    height : 100vh;
    position: relative;
}
.top {
    width: 100vw;
    height: 9vh;
    background-color: rgb(255, 134, 94);
    font-size: 5.3vh;
    color: white;
    font-family: 'Kite One', sans-serif;
    text-align: center;
    padding-left: 3vw;
    /* margin-bottom: 1.6vh; */
    position: relative; 
    display: inline-block;
}
h1 {
    color: rgb(162, 210, 255);
    font-size: 1.8em;
    font-family: 'Gothic A1', sans-serif;
    margin: 1.7vh 0;
    font-weight: lighter;
}
.back {
    width:91vw;
    height: 78.4vh;
    border: 1px solid rgb(255, 134, 94);
    border-radius: 15px;
    background-color: white;
    margin: 0;
    position: relative;
    margin: 1.6vh auto;
}
ul {
    width: 81vw;
    margin: 0 auto;
    padding-left: 0px;
    list-style-type: none;
    text-align: left;
}
li {
    margin-left: 1.2em ;
}
/* .square {
    font-size: 2em;
} */
h2 {
    font-size: 1.8em;
}

</style>