import * as API from '.'


export default {

  //查询获取blog列表(通过page分页)
  findList: params => {
    return API.GET('/api/blog/blogList', params)
  },
 //查询获取blog通过Id(通过page分页)
  findById: id => {
    return API.GET(`/api/blog/${id}`)
  },
//插入blog
  add: params => {
    return API.POST(`/api/blog/insert`, params)
  },
//更新blog
  update: (params) => {
    return API.POST(`/api/blog/update`, params)
  },

//单个删除blog
  remove: (params) => {
    return API.POST(`/api/blog/delete/`,params)
  },
}
