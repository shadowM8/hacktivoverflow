import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/api/axios.js'
import swal from 'sweetalert';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: [],
    username : 'username',
    answers: [],
    isLogin: false,
    oneQuestion: {
      upvotes: [],
      downvotes: [],
      title: '',
      description: '',
      createdBy: {
        name: ''
      },
      answers: []
    }
  },
  mutations: {
    mutateUserName(state,payload) {
      state.username = payload
    },
    initialAnswers(state, payload) {
      state.answers = payload
    },
    mutateAnswers(state, payload) {
      state.answers.unshift(payload)
    },
    initialQuestions(state, payload) {
      state.questions = payload
    },
    mutateQuestions(state, payload) {
      state.questions.unshift(payload)
    },
    mutateIsLogin(state, payload) {
      state.isLogin = payload
    },
    mutateOneQuestion(state, payload) {
      state.oneQuestion = payload
    },
    clearOneQuestion(state) {
      state.oneQuestion = {}
    }
  },
  actions: {
    editAnswer(context, payload) {
      axios({
        url: `answers/${payload.id}`,
        method: 'put',
        data: {
          title: payload.title,
          description : payload.description
        },
        headers: {
          token: localStorage.token
        }
      })
      .then(({data}) => {
        // context.commit('initialQuestions', data)
        context.dispatch('goToQuestion', payload.questionId)
      })
      .catch(err => {
        console.log(err)
      })
    },
    editQuestion(context, payload) {
      axios({
        url: `questions/${payload.id}`,
        method: 'put',
        data: {
          title: payload.title,
          description : payload.description
        },
        headers: {
          token: localStorage.token
        }
      })
      .then(({data}) => {
        // context.commit('initialQuestions', data)
        context.dispatch('goToQuestion', payload.id)
      })
      .catch(err => {
        console.log(err)
      })
    },
    removeDownvoteAnswerNow(context, payload) {
      axios({
        url: `answers/${payload.answerId}/removedownvote`,
        method: 'patch',
        headers: {
          token: localStorage.token
        }
      })
        .then(({data})=> {
          context.dispatch('goToQuestion', payload.questionId)
        })
        .catch(err => {
          console.log(err)
        })
    },
    downVoteAnswerNow(context, payload) {
      axios({
        url: `answers/${payload.answerId}/downvote`,
        method: 'patch',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          context.dispatch('goToQuestion', payload.questionId)
          // context.dispatch('getAllQuestion')
        })
        .catch(err => {
          console.log(err)
        })
    },
    removeUpvoteAnswerNow(context, payload) {
      axios({
        url: `answers/${payload.answerId}/removeupvote`,
        method: 'patch',
        headers: {
          token: localStorage.token
        }
      })
        .then(({data}) => {
          context.dispatch('goToQuestion', payload.questionId)
        })
        .catch(err => {
          console.log(err)
        })
    },
    upVoteAnswerNow(context, payload) {
      axios({
        url: `answers/${payload.answerId}/upvote`,
        method: 'patch',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          // console.log('masuk store',data)
          context.dispatch('goToQuestion', payload.questionId)
          // context.dispatch('getAllQuestion')
        })
        .catch(err => {
          console.log(err)
        })
    },
    addAnswer(context, payload) {
      axios({
        url: `answers/`,
        method: 'post',
        data: payload,
        headers: {
          token: localStorage.token
        }
      })
      .then(({data}) => {
        console.log(payload)
        context.dispatch('goToQuestion', payload.questionId)
      })
      .catch(err => {
        console.log(err)
      })
    },
    removeDownvote(context, payload) {
      axios({
        url: `questions/${payload}/removedownvote`,
        method: 'patch',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          context.dispatch('goToQuestion', data._id)
          context.dispatch('getAllQuestion')
        })
        .catch(err => {
          console.log(err)
        })
    },
    downVoteNow(context, payload) {
      axios({
        url: `questions/${payload}/downvote`,
        method: 'patch',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          context.dispatch('goToQuestion', data._id)
          context.dispatch('getAllQuestion')
        })
        .catch(err => {
          console.log(err)
        })
    },
    removeUpvote(context, payload) {
      axios({
        url: `questions/${payload}/removeupvote`,
        method: 'patch',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          context.dispatch('goToQuestion', data._id)
          context.dispatch('getAllQuestion')
        })
        .catch(err => {
          console.log(err)
        })
    },
    upVoteNow(context, payload) {
      axios({
        url: `questions/${payload}/upvote`,
        method: 'patch',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          context.dispatch('goToQuestion', data._id)
          context.dispatch('getAllQuestion')
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteQuestion(context, payload) {
      axios
        .delete(`/questions/${payload}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          context.dispatch('getAllQuestion')
        })
        .catch(err => {
          console.log(err)
        })
    },
    goToQuestion(context, payload) {
      axios
        .get(`/questions/${payload}`)
        .then(({ data }) => {
          console.log(data)
          // context.commit('clearOneQuestion')
          context.commit('mutateOneQuestion', data)
          // this.$router.push({ path: `/question/${id}` })
        })
        .catch(err => {
          console.log(err)
        })
    },
    addQuestion(context, payload) {
      axios
        .post('/questions', payload, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          swal({
            title: 'congratulations',
            text: 'your questions has been posted, pray so that your questions will be answered',
            icon: 'success'
          })
          context.commit('mutateQuestions', data)
          context.dispatch('getAllQuestion')
        })
        .catch(err => {
          console.log(err)
        })
    },
    getAllQuestion(context) {
      axios
        .get('/questions')
        .then(({ data }) => {
          console.log(data)
          context.commit('initialQuestions', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    register(context, payload) {
      // this.$router.push({ path: "Login" })
      axios
        .post('/users/register', payload)
        .then(({ data }) => {
          console.log(data)
          swal({
            title: 'Congratulations!',
            text: 'Your account has been created, please go to login page to log in',
            icon: 'success'
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    login(context, payload) {
      axios
        .post('/users/login', payload)
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem('token', data.access_token)
          localStorage.setItem('id', data.id)
          localStorage.setItem('username', data.name)
          context.commit('mutateUserName', data.name)
          context.commit('mutateIsLogin', true)
        })
        .catch(err => {
          console.log(err)
        })
    },
    logout(context) {
      swal({
        title: 'Warning',
        text: 'Are you sure you want to log out?',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      })
        .then((willLogout) => {
          if (willLogout) {
            swal("Bye! See you again!", {
              icon: "success",
            })
            context.commit('mutateIsLogin', false)
            context.commit('mutateUserName', null)
            localStorage.clear()
          }
          else {
            swal("Enjoy your time in mini overflow");
          }
        })
        .catch(err => {
          console.log(err)
        })

    }
  }
})
