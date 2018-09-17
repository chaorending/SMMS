import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '../components/Login'
import EditBlog from '@/components/blog/EditBlog'
import BlogList from '@/components/blog/BlogList'
Vue.use(Router)

let router = new Router({
  routes: [{
      path: '/login',
      name: '登录',
      component: Login

    },
    {
      path: '/',
      name: '首页',
      component: Main
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
