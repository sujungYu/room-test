<template>
  <div>
      {{this.token}}
      <button @click="accept">수락</button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            token: null,
        }
    },
    created() {
        this.token = this.$route.params.token
        this.$store.dispatch('checkToken', this.token)
        .then((res) => {
            if(this.$store.getters.useToken === false) {
                alert('invalid invitation url')
                this.$router.push("/:id")
                console.log(res);
            }
        })

    },
    methods: {
        accept() {
            this.$store.dispatch('member', {roomId: this.$store.getters.TokenId, manager: false})
            .then((res) => {
                alert('invitation succeed')
                this.$router.push(`/room/${this.$store.getters.TokenId}`)
                console.log(res);
            })
        }
    }

}
</script>

<style>

</style>