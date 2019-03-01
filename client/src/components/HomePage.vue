<template>
  <div class="title">
    <v-btn v-if="isLogin" class="primary elevation-12" :to="{ path: '/addQuestion'}">Ask Question</v-btn>
    <v-btn class="primary elevation-12" :to="{ path: '/'}">All Question List</v-btn>
    <v-layout
        align-end
        fill-height
        pa-3
        blue--text
      >
        <div v-if="!isLogin" class="title font-weight-light" ><v-btn class="elevation-12" :to="{ path: '/dashboard/'}">Login</v-btn> first if you want to ask questions</div>
      </v-layout>
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    }
  }
};
</script>

<style>
</style>
