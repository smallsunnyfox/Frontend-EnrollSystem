import request from '@/utils/request'
import qs from 'qs' // qs用于对参数进行处理
// 登录请求
export function login (name, password, role) {
  let postData = qs.stringify({
    name: name,
    psw: password
  })
  switch (role) {
    case 'participant':
      return request({
        url: '/user/participant',
        method: 'post',
        data: postData
      })
    case 'organizer':
      return request({
        url: '/user/organizer',
        method: 'post',
        data: postData
      })
    case 'admin':
      return request({
        url: '/user/admin',
        method: 'post',
        data: postData
      })
  }
}
// participant注册请求
export function participantRegister (name, password, phonenumber) {
  let postData = qs.stringify({
    name: name,
    psw: password,
    phone: phonenumber
  })
  return request({
    url: '/user/participantRegister',
    method: 'post',
    data: postData
  })
}
// organizer注册请求
export function organizerRegister (name, password, phonenumber) {
  let postData = qs.stringify({
    name: name,
    psw: password,
    phone: phonenumber
  })
  return request({
    url: '/user/organizerRegister',
    method: 'post',
    data: postData
  })
}
// 获取用户信息
export function getUserInfo (name, role) {
  let postData = qs.stringify({
    name: name,
    role: role
  })
  return request({
    url: '/user/getUserInfo',
    method: 'post',
    data: postData
  })
}
// 修改密码
export function updatePwd (name, role, oldpwd, newpwd) {
  let postData = qs.stringify({
    name: name,
    role: role,
    oldpwd: oldpwd,
    newpwd: newpwd
  })
  return request({
    url: '/user/updatepwd',
    method: 'post',
    data: postData
  })
}
// 忘记密码
export function forgetPwd (name, role, newpwd) {
  let postData = qs.stringify({
    name: name,
    role: role,
    newpwd: newpwd
  })
  return request({
    url: '/user/forgetpwd',
    method: 'post',
    data: postData
  })
}
// 修改信息
export function updateProfile (name, role, newname, newphone) {
  let postData = qs.stringify({
    name: name,
    role: role,
    newname: newname,
    newphone: newphone
  })
  return request({
    url: '/user/updateprofile',
    method: 'post',
    data: postData
  })
}
// 获取admin列表
export function adminList () {
  return request({
    url: '/user/adminList',
    method: 'get'
  })
}
// 添加审核员
export function addAdmin (form) {
  let postData = qs.stringify({
    name: form.name,
    phonenumber: form.phonenumber,
    password: form.password
  })
  return request({
    url: '/user/addAdmin',
    method: 'post',
    data: postData
  })
}
// 修改审核员信息
export function updateAdmin (form) {
  let postData = qs.stringify({
    id: form.uid,
    name: form.uname,
    phonenumber: form.uphonenumber
  })
  return request({
    url: '/user/updateAdmin',
    method: 'post',
    data: postData
  })
}
// 删除审核员
export function deleteAdmin (id) {
  let postData = qs.stringify({
    id: id
  })
  return request({
    url: '/user/deleteAdmin',
    method: 'post',
    data: postData
  })
}
// 搜索审核员
export function searchAdmin (name) {
  let postData = qs.stringify({
    name: name
  })
  return request({
    url: '/user/searchAdmin',
    method: 'post',
    data: postData
  })
}
// 登录前找回密码
export function forgetPwdBeforeLogin (form) {
  let postData = qs.stringify({
    username: form.username,
    userrole: form.userrole,
    phone: form.phonenumber,
    newpwd: form.fnewpwd
  })
  return request({
    url: '/user/forgetPwdBeforeLogin',
    method: 'post',
    data: postData
  })
}
// 管理员修改用户密码
export function changeUserpwd (form) {
  let postData = qs.stringify({
    name: form.cname,
    role: form.crole,
    pwd: form.cnewpwd
  })
  return request({
    url: '/user/changeUserpwd',
    method: 'post',
    data: postData
  })
}
