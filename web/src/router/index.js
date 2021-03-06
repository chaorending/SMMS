import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '../components/Login'
import EditBlog from '@/components/blog/EditBlog'
import BlogList from '@/components/blog/BlogList'
import TypeList from '@/components/type/TypeList'
import Userinfo from '@/components/user/UserInfo'
Vue.use(Router)

let router = new Router({
  routes: [{
      path: '/login',
      name: '登录',
      component: Login

    }
    ,
    {
      path: '/',
      name: '首页',
      component: Main,
      menuShow: true
    }, {
      path: '/',
      component: Main,
      name: '博文管理',
      menuShow: true,
      iconCls: 'iconfont icon-books',
      children: [{
          path: '/blog/edit',
          component: EditBlog,
          name: '编辑博文',
          menuShow: true,
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/blog/list',
          component: BlogList,
          name: '博文列表',
          menuShow: true,
          meta: {
            keepAlive: false // 不需要被缓存
          }
        },
      ]
    },{
      path:'/',
      component:Main,
      name:"类型维护",
      menuShow: true,
      iconCls:"el-icon-document",
      children:[{
        path:'/type/list',
        name:'类型列表',
        menuShow: true,
        component:TypeList
      }]
    },
    {
      path:'/',
      component:Main,
      name:"用户管理",
      menuShow:true,
      iconCls:"el-icon-document",
      children:[{
         path:'/user/userInfo',
         component:Userinfo,
         name:"修改用户信息",
         menuShow: true
      }]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log('to:' + to.path)
  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('access-user')
    next()
  } else {
    let user = JSON.parse(window.localStorage.getItem('access-user'))
    if (!user) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  }
})
export default router
