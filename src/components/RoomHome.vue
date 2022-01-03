<template>
  <div>
      <div class="top">
          offco<i class="fas fa-sign-out-alt out" v-on:click="out"></i>
      </div>

      <div class="back">
          <h1>전체</h1>
          <hr style= "width:81vw; height:1px; border:none; background-color:rgb(162, 210, 255); margin-bottom:6vh">
          <ul>
          <li v-for="roomlist in roomlists" v-bind:key="roomlist.roomname">
            <router-link :to="/room/ + roomlist.id" tag="span" style="cursor: pointer">
              <div class="box">{{roomlist.roomname}}</div>
            </router-link>
            <hr style= "width:81vw; height:1px; border:none; background-color:rgba(57, 62, 70, 0.4); margin:2.8vh 0">
          </li>
          </ul>
          <i class="fas fa-plus-circle createroom" v-on:click="create"></i>
      </div>
      <div class="bottom">
          <i class="fas fa-user-circle icon"></i>
          <i class="fas fa-list-alt icon"></i>
          <i class="fas fa-ellipsis-h icon"></i>
      </div>
  </div>
</template>

<script>
// import axios from "axios";
export default {
    data() {
        return {
        roomlists: [],
        userid: ''
        }
    },
    created() {
        this.$store.commit('initData')
        this.userid = JSON.parse(localStorage.getItem("user")).id
        this.$store.dispatch('checkRoom', this.userid)
        this.roomlists = this.$store.state.userRooms
        // location.replace()
        // console.log(this.roomlists);
    //     axios.get(`${'http://localhost:8000/room'}`, {params: {sigid: localStorage.getItem("user")}})
    //     .then((res) => {
    //       for(let i=0; i<res.data.length; i++) {
    //           this.roomlists[i] = res.data[i]
    //           console.log(i);
    //       }
          
    //       console.log(this.roomlists);
    //   }).catch((error) => {
    //       console.log(error);
    //   })
    },
    methods: {
        create() {
            this.$router.push('/room/create')
        },
        out() {
            localStorage.removeItem('user')
            this.$router.push('/login')
        }
    },

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
ul {
    width: 81vw;
    margin: 0 auto;
    padding: 0;
    
    /* display: block; */
    /* padding: 10px; */
    list-style-type: none;
    /* display: inline-block; */
    /* vertical-align: middle; */
    /* position: absolute; */
    
}
li {
    /* margin: 3vh 0; */
    /* position: relative; */
    /* margin: 3vh 0; */
    /* display: inline-block; */
    /* vertical-align: middle; */
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
    /* position: relative;  */
    /* display: inline-block; */
}
.bottom {
    margin: auto;
    width: 100vw;
    height: 9vh;
    background-color: rgb(255, 134, 94);
    font-size: 3em;
    color: white;
    vertical-align : middle;
    justify-content: space-around;
    display: flex;
    /* flex-flow: row; */
    /* position: fixed; */
    /* letter-spacing: 0.5px; */
    /* padding: 2vh 3vw; */
    /* font-family: 'Kite One', sans-serif; */
    /* margin-bottom: 1.6vh;  */
}
.box {
    /* margin: 0 2vh; */
    width: 80.9vw;
    height: 8.3vh;
    font-family: 'Gothic A1', sans-serif;
    font-size: 2em;
    text-align: center;
    border: 1px solid rgb(57, 62, 70);
    border-radius: 15px;
    line-height: 8.8vh;
    margin-bottom: 2.1vh;
    position: relative;
    background-color: white;
    margin: auto;
    /* margin-bottom: 3vh; */
}
.createroom {
    font-size: 3.5em;
    color: rgb(255, 134, 94);
    left: 32vw;
    /* top: 27vh; */
    position: relative;
    /* justify-content: flex-end;
    display: inline-block; */
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
h1 {
    color: rgb(162, 210, 255);
    font-size: 1.8em;
    font-family: 'Gothic A1', sans-serif;
    margin: 1.7vh 0;
    font-weight: lighter;
}
.out {
    position: absolute;
    left: 80vw;
    top: 2vh;
}
.icon {
    margin-top: 2vh;
}

</style>