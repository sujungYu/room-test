<template>
  <div>
      <input placeholder="방 이름을 입력하세요" v-model="roomname" type="text" >
      <button v-on:click="cancel">취소</button>
      <button v-on:click="create">생성</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            roomname: ""
        }
    },
    methods: {
        cancel() {
           this.$router.push('./room/create')
        },
        create() {
            let roominfo = {
                 roomname: this.roomname,
                 manager: JSON.parse(localStorage.getItem("user")),
             }
            //  console.log({data});
             axios.post('http://localhost:8000/room', {roominfo}, {
                 headers: { "Content-Type": `application/json`}
             }).then((res)=> {
                 this.createroom(res.data.id)
             }).catch((error) => {
                 console.log(error);
             })
        },
        createroom(roomId) {
            this.$store.dispatch('member', {roomId: roomId, manager:true})
            .then((res) => {
                this.$router.push(`/room/${roomId}`)
                console.log(res);
            }).catch((error) => { 
                console.log(error);
            })
        }
    }
}
</script>

<style>

</style>