import request from '@/utils/request'
import qs from 'qs' // qs用于对参数进行处理
export function test () {
  return request({
    url: '/test',
    method: 'get'
  })
}

export function login (name, password, role) {
  let postData = qs.stringify({
    name: name,
    psw: password
  })
  switch (role) {
    case 'participant':
      return request({
        url: '/participant/login',
        method: 'post',
        data: postData
      })
    case 'organizer':
      return request({
        url: '/organizer/login',
        method: 'post',
        data: postData
      })
    case 'admin':
      return request({
        url: '/admin/login',
        method: 'post',
        data: postData
      })
  }
}
