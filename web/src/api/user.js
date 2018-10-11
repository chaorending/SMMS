import * as API from './'

export default {
  //登录
  login: params => {
    return API.POST('/api/users/login', params)
  },
  //登出
  logout: params => {
    return API.GET('/api/v1/users/logout', params)
  },
  //修改个人信息
  changeuserinfo: params => {
    return API.POST('/api/users/updateuserinfo', params)
  }
}