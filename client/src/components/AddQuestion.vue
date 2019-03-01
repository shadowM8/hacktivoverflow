<template>
  <v-layout align-center justify-center>
    <v-flex xs9 >
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Ask A Question</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <form v-on:submit.prevent="addQuestion">
            <v-text-field prepend-icon="create" label="question title" type="text" v-model="title"></v-text-field>
            <v-text-field
              prepend-icon="tag_faces"
              label="description"
              type="text"
              v-model="description"
            ></v-text-field>
            <v-btn type="submit" color="primary">Submit</v-btn>
          </form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
// import VueFroala from "vue-froala-wysiwyg";
export default {
  data: function() {
    return {
      title: "",
      description: "",
      config: {
        events: {
          placeholderText: 'Edit Your Content Here!',
          "froalaEditor.initialized": function() {
            console.log("initialized");
          }
        }
      }
    };
  },
  methods: {
    addQuestion() {
      let dePayLoad = {
        title: this.title,
        description: this.description
      };
      this.$store.dispatch("addQuestion", dePayLoad);
      this.redirect()
    },
    redirect() {
      this.$router.push({ path: "/" })
    }
  }
};
</script>

<style>
</style>
