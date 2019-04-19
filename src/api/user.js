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
        url: '/login/participant',
        method: 'post',
        data: postData
      })
    case 'organizer':
      return request({
        url: '/login/organizer',
        method: 'post',
        data: postData
      })
    case 'admin':
      return request({
        url: '/login/admin',
        method: 'post',
        data: postData
      })
  }
}
export function participantRegister (name, password, phonenumber) {
  let postData = qs.stringify({
    name: name,
    psw: password,
    phone: phonenumber
  })
  return request({
    url: '/login/participantRegister',
    method: 'post',
    data: postData
  })
}

export function organizerRegister (name, password, phonenumber) {
  let postData = qs.stringify({
    name: name,
    psw: password,
    phone: phonenumber
  })
  return request({
    url: '/login/organizerRegister',
    method: 'post',
    data: postData
  })
}

export function getUserInfo (name, role) {
  let postData = qs.stringify({
    name: name,
    role: role
  })
  return request({
    url: '/login/getUserInfo',
    method: 'post',
    data: postData
  })
}
