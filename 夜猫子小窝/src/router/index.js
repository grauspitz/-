import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Category from '@/pages/Category'
import Article from '@/pages/Article'
import User from '@/pages/User'
Vue.use(Router)

export default new Router({
 
  routes: [
    {
      path:'/',
      redirect:{name:'home'},
    },
    {
      path: '/home',
      component: Home,
      name:'home'
    },
    {
      path: '/category',
      component: Category
    },
    {
      path: '/article',
      component: Article
    },
    {
      path: '/user',
      component: User
    },
  ]
})
