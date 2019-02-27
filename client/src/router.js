import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import component1 from '@/components/dashboard.vue'
import component2 from '@/components/HomePage.vue'
import component3 from '@/components/event.vue'
import AddQuestion from '@/components/AddQuestion.vue'
import Login from '@/components/loginForm.vue'
import Register from '@/components/registerForm.vue'
import oneQuestion from '@/components/oneQuestion.vue'
import AllQuestion from '@/components/AllQuestion.vue'


Vue.use(Router)


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/dashboard',
      
      component: component1,
      children : [{
        name : 'Login',
        path : '/',
        component : Login
      },{
        name : 'Register',
        path : '/register',
        component : Register
      }
    ]
    },
    {
      path: '/home',
      component: component2,
      children : [{
        path : '/',
        component : AllQuestion
      },{
        path : '/addQuestion',
        component : AddQuestion
      },{
        path : '/question/:id',
        component : oneQuestion
      }
    ]
    },
    {
      path: '/event',
      name: 'Page Three',
      component: component3,
    },
    // { path: '*', redirect: '/home' }
  ]
})
