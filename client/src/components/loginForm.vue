<template>
    <v-layout v-if=!isLogin align-center justify-center>
      <v-flex xs7>
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <form v-on:submit.prevent="loginNow">
            <v-text-field prepend-icon="create" label="Email" type="text" v-model="email"></v-text-field>
            <v-text-field prepend-icon="not_listed_location" label="Password" type="password" v-model="password"></v-text-field>
            <!-- <froala :tag="'textarea'" :config="config" v-model="description"></froala> -->
            <!-- <input  prepend-icon="attach_file"  label="File Image" type="file" @change="uploadImage"> -->
            <v-btn type="submit" color="primary">Submit</v-btn>
          </form>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
export default {
    data: function() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    loginNow() {
      let dePayLoad = {
        email: this.email,
        password : this.password
      };
      this.$store.dispatch("login", dePayLoad);
      this.redirect()
    },
    redirect(){
        this.$router.push({ path: "/" })
    }
  },
  computed: {
    isLogin(){
      return this.$store.state.isLogin
    }
  }
}
</script>

<style>

</style>
