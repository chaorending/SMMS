import * as API from '.'


export default {
  //查询获取类型列表(通过page分页)
  findList: params => {
    return API.POST('/api/type/typeList', params)
  },
 //查询获取类型通过Id(通过page分页)
  findById: id => {
    return API.GET(`/api/type/${id}`)
  },
//插入类型
  add: params => {
    return API.POST(`/api/type/insert`, params)
  },
//更新类型
  update: (params) => {
    return API.POST(`/api/type/update`, params)
  },
//单个删除blog
  remove: (params) => {
    return API.POST(`/api/type/delete/`,params)
  },
}
