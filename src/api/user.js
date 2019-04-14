import request from '@/utils/request'
import qs from 'qs' //qs用于对参数进行处理
export function test () {
  return request({
    url: '/test',
    method: 'get'
  })
}

export function adminLogin (adminname,password) {
  //对参数进行处理
  let postData = qs.stringify({
    name:adminname,
    psw:password
  })
  return request({
    url: '/admin/login',
    method: 'post',
    data: postData
  })
}


