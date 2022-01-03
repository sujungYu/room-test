<template>
  <div>
      <div class="top">
          <i class="fas fa-arrow-left left" v-on:click="out"></i>
          offco
      </div>
      
        <div class="back">
          <h1 class="title">{{roomTitle}}</h1>
          <h3 class="navbar">
            <router-link :to= "/room/ + this.id" tag="span">홈</router-link>
            <router-link :to= "/room/ + this.id" tag="span">채팅</router-link>
            <router-link :to= "/room/ + this.id" tag="span">일정</router-link>
          </h3>
          
          <ul>
          <li v-for="user in users" v-bind:key="user">
             <h2>
                 <i class="far fa-square square"></i>&nbsp;&nbsp;{{user}}
             </h2>
          </li>
            </ul>
            <button class="invite" v-on:click="invite">멤버초대<i class="fas fa-plus"></i></button>
            <invite v-show="showModal" v-bind:open="showModal" @close="showModal=false"></invite>
          <!-- <i class="fas fa-plus-circle createroom" ></i> -->
      </div>
      

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
            id: null,
            showModal: false,
            userid:null
        }
    },
    // props: [
    //     'id'
    // ],
    created() {
        this.id = this.$route.params.id
        console.log(this.id);
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
    },
    methods: {
        invite() {
             this.showModal = !this.showModal;
            // this.$router.push('./invite')
        },
        out() {
            this.userid = JSON.parse(localStorage.getItem("user")).id;
            console.log(this.userid);
            this.$router.push('/roomhome/'+ this.id)
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kite+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Gothic+A1&display=swap');
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
    /* position: relative; 
    display: inline-block; */
}
.title {
    margin: 1.7vh auto;
    width: 84.1vw;
    height: 7.6vh;
    color: white;
    background-color: rgb(255, 134, 94);
    text-align: center;
    font-size: 1.8em;
    font-family: 'Gothic A1', sans-serif;
    /* margin: 1.7vh 0; */
    font-weight: lighter;
    position: relative;
    line-height: 8vh;
    border-radius: 15px;
}
.back {
    width:91vw;
    height: 78.4vh;
    border: 1px solid rgb(162, 210, 255);
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

h2 {
    font-size: 2em;
    font-weight: lighter;
    font-family: 'Gothic A1', sans-serif;
}
.left {
    left: 4vw;
    top: 2vh;
    position: absolute
}
.square {
    font-size: 1.2em;
    font-weight: lighter;
}
.invite {
    padding: 0;
    width: 36.3vw;
    height: 6.5vh;
    border: none;
    border-radius: 15px;
    background-color: rgb(255, 134, 94);
    color: white;
    font-size: 1.8em;
    font-family: 'Gothic A1', sans-serif;
    left: 22vw;
    /* top: 27vh; */
    position: relative;
}
.navbar {
    font-size: 1.8em;
    font-family: 'Gothic A1', sans-serif;
    font-weight: 600;
    vertical-align : middle;
    justify-content: space-around;
    display: flex;
    transition: color 0.25s ease-in;
}
.navbar:hover {
    color:rgb(255, 134, 94);
    transition: color 0.35s ease-out;
}

</style>