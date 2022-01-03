<template>
  <div>
      <div class="modal" :class="{'active': true }">>
        <div class="overlay" @click="$emit('close')"></div>
            <div class="modal-card">
                <button v-on:click="createinvitetoken">초대링크생성</button>
                    <input v-model="inviteurl" placeholder="아래 링크를 복사하여 멤버를 초대하세요." type="text">

            </div>
      </div>
  </div>
  
</template>

<script>
export default {
    data() {
        return {
            token:null,
            inviteurl: "",
        }
    },
    computed: {
        invitetoken() {
            return this.token
        }  
    },
    watch: {
        invitetoken (val) {
            this.inviteurl = `http://localhost:8080/room/n/${val}`
        }
    },
    methods: {
        createinvitetoken() {
            this.token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            this.$store.dispatch('inviteToken', this.token)
        }
    }

}
</script>

<style>
.modal,
.overlay {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
}
.overlay {
  opacity: 0.5;
  background-color: black;
}
.modal-card {
  position: relative;
  max-width: 88vw;
  margin: auto;
  margin-top: 8vh;
  padding-top: 2vh;
  /* padding: 20px; */
  background-color: rgb(254, 249, 239);
  border-radius: 15px;
  min-height: 80vh;
  z-index: 10;
  opacity: 1;
}
</style>