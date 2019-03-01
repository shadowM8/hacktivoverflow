<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Edit Form</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <form v-on:submit.prevent="editQuestion">
                <v-text-field prepend-icon="create" label="question title" type="text" v-model="question.title"></v-text-field>
                <v-textarea
                prepend-icon="tag_faces"
                label="description"
                type="text"
                v-model="question.description"
                ></v-textarea>
                <v-btn type="submit" color="primary">Submit</v-btn>
            </form>
            <!-- <v-btn color="primary" flat @click="closeDialog">I accept</v-btn> -->
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      userId: localStorage.getItem("id"),
    };
  },
  methods : {
      closeDialog(){
          this.$emit('closedialog', false)
      },
      editQuestion(){
          let dePayload = {
              title : this.question.title,
              description : this.question.description,
              id : this.question._id
          } 
          this.$emit('closedialog', false)
          this.$store.dispatch('editQuestion', dePayload)
      }
  },
  computed : {
      question() {
        return this.$store.state.oneQuestion;
      }
  }
};
</script>

<style>
</style>
