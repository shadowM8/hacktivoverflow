<template>
  <div class="title">
    <v-btn v-if="!isLogin" class="primary elevation-12" :to="{ path: '/dashboard/'}" >Login</v-btn>
    <v-btn v-if="!isLogin" class="primary elevation-12" :to="{ path: '/register'}" >Register</v-btn>
    <v-btn v-if="isLogin" class="primary elevation-12" @click="logout">Logout</v-btn>

    <router-view/>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
    //   isLogin : ''
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.redirect()
    },
    redirect(){
        this.$router.push({ path: "/dashboard" })
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    }
  }
};
</script>

<style>
</style>
