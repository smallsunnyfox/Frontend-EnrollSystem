import request from '@/utils/request'

export function test () {
  return request({
    url: '/test',
    method: 'get'
  })
}

export function adminLogin (data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}


