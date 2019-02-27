<template>
  <v-container>
    <v-layout row wrap>
      <v-flex my-2 class="elevation-12" xs12>
        <v-card>
          <v-layout>
            <v-flex>
              <v-layout fill-height align-center justify-content-center row wrap>
                <v-btn @click="upVoteThisQuestion(question)" flat :style="{color:upvoteColor}">
                  <v-icon>expand_less</v-icon>
                </v-btn>
                <v-btn flat color="red">{{question.upvotes.length - question.downvotes.length}}</v-btn>
                <v-btn @click="downVoteThisQuestion(question)" flat :style="{color:downvoteColor}">
                  <v-icon>expand_more</v-icon>
                </v-btn>
              </v-layout>
            </v-flex>
            <v-flex>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">
                    <b>{{question.title}}</b>
                  </h3>
                  <span class="grey--text">{{question.createdBy.name}}</span>
                </div>
              </v-card-title>
              <v-card-text>
                <div align-content-justify>{{ question.description }}</div>
              </v-card-text>
              <v-card-actions v-if="userId === question.createdBy._id">
                <v-dialog v-model="dialog">
                  <v-btn slot="activator" flat color="warning">EDIT QUESTION</v-btn>
                  <editform @closedialog="closeDialog"/>
                </v-dialog>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
        <v-card>
          <v-layout>
            <v-flex>
              <v-toolbar dark color="primary">
                <v-toolbar-title>Your Answer</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <form v-on:submit.prevent="addAnswer">
                <v-text-field
                  prepend-icon="create"
                  label="Answer Title"
                  type="text"
                  v-model="title"
                ></v-text-field>
                <v-textarea
                  v-model="description"
                  prepend-icon="not_listed_location"
                  label="Your Answer here"
                  rows="2"
                ></v-textarea>
                <v-btn type="submit" color="primary">Submit</v-btn>
              </form>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <answers/>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import answers from "@/components/answer";
import editform from "@/components/EditForm";
import swal from "sweetalert";
export default {
  components: {
    answers,
    editform
  },
  computed:
    //   mapState([
    //       'question'
    //   ])
    {
      question() {
        return this.$store.state.oneQuestion;
      }
    },
  created() {
    this.$store.dispatch("goToQuestion", this.$route.params.id);
  },
  data() {
    return {
      title: "",
      description: "",
      dialog: false,
      userId: localStorage.getItem("id"),
      upvoteColor: "blue",
      downvoteColor: "blue",
      disabled: "false"
    };
  },
  methods: {
    closeDialog(event) {
      console.log("ini emit", event);
      this.dialog = event;
    },
    addAnswer() {
      let dePayload = {
        title: this.title,
        description: this.description,
        questionId: this.$route.params.id
      };
      this.$store.dispatch("addAnswer", dePayload);
      this.title = "";
      this.description = "";
    },
    upVoteThisQuestion(question) {
      let userId = localStorage.id;
      if (userId === question.createdBy._id) {
        swal({
          title: "Warning",
          text: "you cant upvote your own question!",
          icon: "error"
        });
      } else {
        if (question.upvotes.indexOf(userId) === -1) {
          console.log(`upvote this ${question._id}`);
          this.$store.dispatch("upVoteNow", question._id);
          this.upvoteColor = "red";
        } else {
          console.log(`user ${userId} already upvote, so will cancel upvote`);
          this.$store.dispatch("removeUpvote", question._id);
          this.upvoteColor = "blue";
        }
      }
    },
    downVoteThisQuestion(question) {
      let userId = localStorage.id;
      if (userId === question.createdBy._id) {
        swal({
          title: "Warning",
          text: "you cant downvote your own question!",
          icon: "error"
        });
      } else {
        if (question.downvotes.indexOf(userId) === -1) {
          console.log(`upvote this ${question._id}`);
          this.$store.dispatch("downVoteNow", question._id);
          this.downvoteColor = "red";
        } else {
          console.log(
            `user ${userId} already downvote, so will cancel downvote`
          );
          this.$store.dispatch("removeDownvote", question._id);
          this.downvoteColor = "blue";
        }
      }
    }
  }
};
</script>

<style>
</style>
