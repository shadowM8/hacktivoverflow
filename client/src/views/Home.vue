<template>
  <v-container>
    <v-layout row wrap>
    <v-flex my-2 class="elevation-12" xs12 v-for="(question,index) in questions" :key="index">
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">
              <a @click="goToQuestion(question._id)"><b>{{question.title}}</b></a>
            </h3>
            <span class="grey--text">{{question.createdBy.name}}</span>
            <br>
            <div>{{ question.description }}</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="orange">Upvote {{ question.upvotes.length }}</v-btn>
          <v-btn flat color="orange">Downvote {{question.downvotes.length}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
  </v-container>
  
</template>

<script>
import axios from '@/api/axios.js'
export default {
  data() {
    return {
      // upvotes: 0,
      // downvotes: 0
    };
  },
  methods: {
    upvotesCount(index) {
      this.upvotes = this.$store.state.questions[index].upvotes.length;
    },
    downvotesCount(index) {
      this.downvotes = this.$store.state.questions[index].downvotes.length;
    },
    goToQuestion(id){
      axios
        .get(`/questions/${id}`)
        .then(({data}) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    questions() {
      return this.$store.state.questions;
    }
  }
};
</script>
