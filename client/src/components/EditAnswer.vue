<template>
  <v-dialog v-model="dialog">
    <v-btn v-if="userId === answer.createdBy._id" slot="activator" flat color="warning">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-container>
      <v-layout>
        <v-flex>
          <v-card>
            <v-toolbar dark color="primary">
              <v-toolbar-title>Edit Answer</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <form v-on:submit.prevent="editAnswer">
                <v-text-field
                  prepend-icon="create"
                  label="answer title"
                  type="text"
                  v-model="answer.title"
                ></v-text-field>
                <v-textarea
                  prepend-icon="tag_faces"
                  label="description"
                  type="text"
                  v-model="answer.description"
                ></v-textarea>
                <v-btn type="submit" color="primary">Submit</v-btn>
              </form>
              <!-- <v-btn color="primary" flat @click="closeDialog">I accept</v-btn> -->
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-dialog>
</template>

<script>
export default {
  props: ["answer"],
  data() {
    return {
      // upvotes: 0,
      // downvotes: 0
      userId: localStorage.getItem("id"),
      dialog: false
      //   title : this.question.title,
      //   description : this.question.description
      //   dialog: false
    };
  },
  methods: {
    closeDialog() {
      this.dialog = false;
    },
    //   closeDialog(){
    //       this.$emit('closedialog', false)
    //   },
    editAnswer() {
      let dePayload = {
        title: this.answer.title,
        description: this.answer.description,
        id: this.answer._id,
        questionId: this.question._id
      };
      //   this.$emit('closedialog', false)
      this.closeDialog();
      this.$store.dispatch("editAnswer", dePayload);
    }
  },
  computed: {
    question() {
      return this.$store.state.oneQuestion;
    }
  }
};
</script>

<style>
</style>
