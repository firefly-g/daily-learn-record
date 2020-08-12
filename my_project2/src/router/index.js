import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import Users from '@/components/user/Users'
import Rights from '@/components/rights/Rights'
import Router from 'vue-router'
import Roles from '@/components/Roles'
import Cate from '@/components/goods/Cate'
import Params from '@/components/goods/Params'
import GoodsList from '@/components/goods/List'
import Add from '@/components/goods/Add'
import Order from '@/components/order/Order'
import Report from '@/components/report/Report'

Vue.use(VueRouter)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes: [
    { path:'/', redirect:'/login'},
    { path:'/login' , component:Login },
  
    {
      path:'/home',
      component:Home,
      redirect:'/welcome',
      children:[
        {  path:'/welcome', component:Welcome },
        {  path:'/users',  component:Users },
        {  path:'/rights', component:Rights },
        {  path:'/roles',component:Roles },
        {  path:'/params',component:Params },
        {path:'/goods',component:GoodsList},
        {path:'/goods/add',component:Add},
        {path:'/orders',component:Order},
        {path:'/reports',component:Report},
        {path:'/categories',component:Cate},
        
      ]
    }
  ]
  
})
//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
  // 127.0.0.1:8080/login
  if(to.path==='/login') {
    return next();
  }
  //获取token
  const tokenStr = window.sessionStorage.getItem('token');
  if(!tokenStr) {
    return next('/login')
  }
  // 127.0.0.1:8080/home
  // 127.0.0.1:8080/users
  // 
  next()
})

export default router

