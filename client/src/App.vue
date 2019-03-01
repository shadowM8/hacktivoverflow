<template>
  <v-app>
    <v-navigation-drawer app fixed clipped width="190">
      <v-list>
        <v-list-tile v-for="(i,index) in 3" :to="{path: page[i-1]}" :key="index">
          <v-list-tile-action>
            <v-icon>{{ icons[i-1] }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ title[i-1]  }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>verified_user</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            USER {{user}}
          </v-list-tile-content>
        </v-list-tile>
        
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-title class="headline text-uppercase">
        <span>Mini</span>
        <span class="font-weight-light">StackFlow</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu :nudge-width="-100">
        <v-toolbar-title slot="activator">
          Toolbar
        </v-toolbar-title>
        <v-list>
          <v-list-tile :to="'/page1'">
            Settings
          </v-list-tile>
          <v-list-tile :to="'/page2'">
            <v-list-tile-title v-text="'Account'"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    // HelloWorld
  },
  data() {
    return {
      icons: ["dashboard", "home", "event"],
      title : ["DASHBOARD","HOME","TAG"],
      page : ["/dashboard","/", "event"],
      
    };
  },
  created() {
    if(localStorage.getItem('token')) {
      this.$store.commit('mutateIsLogin', true)
      this.$store.commit('mutateUserName', localStorage.username)
    }
    this.$store.dispatch('getAllQuestion')
  },
  computed : {
    user(){
      return this.$store.state.username
    }
  }
};
</script>
