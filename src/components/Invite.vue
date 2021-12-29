<template>
  <div>
      <button v-on:click="createinvitetoken">초대링크생성</button>
      <input v-model="inviteurl" placeholder="아래 링크를 복사하여 멤버를 초대하세요." type="text">
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

</style>