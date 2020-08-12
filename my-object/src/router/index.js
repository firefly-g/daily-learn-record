import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import Home from '@/components/Home'
import Login from '@/components/Login'


Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]

const router = new VueRouter({
  routes:[
    {path:'/',redirect:'/login'},
    {path:'/login',component:Login},
    {path:'/home',component:Home}
  ]
})

export default router

router.beforeEach((to,from,next)=>{
  if(to.path==='/login')
  return next();
  const tokenStr=window.sessionStorage.getItem('token');
  if(!tokenStr)
  return next('/login');
  next()
})