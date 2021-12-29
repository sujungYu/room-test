<template>
  <div>
      <i class="fas fa-plus-circle createroom" v-on:click="create"></i>
      <!-- <ul> -->
          <li v-for="roomlist in roomlists" v-bind:key="roomlist.roominfo.roomname">
            <router-link :to="/room/ + roomlist.id" tag="span" style="cursor: pointer">
              {{roomlist.roominfo.roomname}}
            </router-link>
          </li>
      <!-- </ul> -->
      <!-- <div class="invite"></div> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
        roomlists: []
        }
    },
    created() {
        axios.get(`${'http://localhost:8000/room'}`, {params: {userid: localStorage.getItem("user")}})
        .then((res) => {
          for(let i=0; i<res.data.length; i++) {
              this.roomlists[i] = res.data[i]
              console.log(i);
          }
          
          console.log(this.roomlists);
      }).catch((error) => {
          console.log(error);
      })
    },
    methods: {
        create() {
            this.$router.push('/room/create')
        }
    },

}
</script>

<style scoped>
div {
    font-size: 10px;
    background-color: rgb(254, 249, 239);
    text-align: center;
    width : 100vw;
    height : 100vh;
}
/* .top {

} */
.createroom {
    font-size: 3.5em;
    color: rgb(255, 134, 94);
}

</style>