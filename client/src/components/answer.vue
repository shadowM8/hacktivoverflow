<template>
  <v-container>
    <v-layout row wrap>
      <v-flex my-2 class="elevation-12" xs12>
        <v-toolbar dark color="success">
          <v-toolbar-title>All Answer</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card v-for="(answer,index) in question.answers" :key="index">
          <v-layout>
            <v-flex xs1>
              <v-layout v-if="answer" fill-height align-center justify-content-center row wrap>
                <v-btn @click="upVoteThisAnswer(answer)" flat :style="{color:upvoteColor}">
                  <v-icon>expand_less</v-icon>
                </v-btn>
                <v-btn flat color="red">SCORE <br><br>{{answer.upvotes.length - answer.downvotes.length}}</v-btn>
                <v-btn @click="downVoteThisAnswer(answer)" flat :style="{color:downvoteColor}">
                  <v-icon>expand_more</v-icon>
                </v-btn>
              </v-layout>
            </v-flex>
            <v-flex xs8>
              <v-layout>
                <v-card-title success-title>
                  <div>
                    <h3 class="headline mb-0">
                      <!-- <a @click="goToAnswer(question._id)"> -->
                      <b>{{answer.title}}</b>
                      <!-- </a> -->
                    </h3>
                    <span class="grey--text">{{answer.createdBy.name}}</span>
                  </div>
                </v-card-title>
                <v-card-text>{{answer.description}}</v-card-text>
              </v-layout>
            </v-flex>
            <v-flex xs1>
              <v-layout fill-height align-center>
                <editanswer :answer="answer" />
              </v-layout>
            </v-flex>
            <v-flex xs1>
              <v-layout fill-height align-center>
                <div v-if="userId === answer.createdBy._id">
                  <a @click="deleteAnswer(answer._id)">
                    <v-icon>delete</v-icon>
                  </a>
                </div>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import editanswer from "@/components/EditAnswer.vue";
export default {
  components: {
    editanswer
  },
  computed: {
    question() {
      return this.$store.state.oneQuestion;
    }
  },
  data() {
    return {
      userId: localStorage.getItem("id"),
      upvoteColor: "green",
      downvoteColor: "green"
      // dialog: false
    };
  },
  methods: {
    // closeDialog(event) {
    //   console.log("ini emit", event);
    //   this.dialog = event;
    // },
    upVoteThisAnswer(answer) {
      let userId = localStorage.id;
      if (userId === answer.createdBy._id) {
        swal({
          title: "Warning",
          text: "you cant upvote your own answer!",
          icon: "error"
        });
      } else {
        let dePayload = {
          questionId: this.$route.params.id,
          answerId: answer._id
        };
        if (answer.upvotes.indexOf(userId) === -1) {
          console.log(`upvote this ${answer._id}`);
          this.upvoteColor = "red";
          this.$store.dispatch("upVoteAnswerNow", dePayload);
        } else {
          console.log(`user ${userId} already upvote, so will cancel upvote`);
          this.$store.dispatch("removeUpvoteAnswerNow", dePayload);
          this.upvoteColor = "green";
        }
      }
    },
    downVoteThisAnswer(answer) {
      let userId = localStorage.id;
      if (userId === answer.createdBy._id) {
        swal({
          title: "Warning",
          text: "you cant downvote your own answer!",
          icon: "error"
        });
      } else {
        let dePayload = {
          questionId: this.$route.params.id,
          answerId: answer._id
        };
        if (answer.downvotes.indexOf(userId) === -1) {
          console.log(`downvote this ${answer._id}`);
          this.downvoteColor = "red";
          this.$store.dispatch("downVoteAnswerNow", dePayload);
        } else {
          console.log(
            `user ${userId} already downvote, so will cancel downvote`
          );
          this.$store.dispatch("removeDownvoteAnswerNow", dePayload);
          this.downvoteColor = "green";
        }
      }
    },
    editAnswer(id) {
      console.log("edit answer nih");
    },
    deleteAnswer(id) {
      console.log("delete answer nih");
      //   swal({
      //     title: "Warning",
      //     text: "Are you sure you want to delete your answer?",
      //     icon: "warning",
      //     buttons: true,
      //     dangerMode: true
      //   })
      //     .then(willDelete => {
      //       if (willDelete) {
      //         swal("Poof! your question is gone!", {
      //           icon: "success"
      //         });
      //         this.$store.dispatch("deleteQuestion", id);
      //       } else {
      //         swal("Phew, that was close one");
      //       }
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
    }
  }
};
</script>

<style>
</style>
