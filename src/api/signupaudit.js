import request from '@/utils/request'
import qs from 'qs' // qs用于对参数进行处理
// 获取组织者的报名审核的方法
export function getMySignupAudit (name) {
  let postData = qs.stringify({
    name: name
  })
  return request({
    url: '/entryformaudit/getAuditOfOrganizer',
    method: 'post',
    data: postData
  })
}
// 查询组织者的报名审核的方法
export function searchAudit (organizer, type, value) {
  let postData = qs.stringify({
    organizer: organizer,
    type: type,
    value: value
  })
  return request({
    url: '/entryformaudit/searchAudit',
    method: 'post',
    data: postData
  })
}
// 通过审核的方法
export function passSignup (id) {
  let postData = qs.stringify({
    id: id
  })
  return request({
    url: '/entryformaudit/passSignup',
    method: 'post',
    data: postData
  })
}
// 不通过审核的方法
export function unpassSignup (id, reason) {
  let postData = qs.stringify({
    id: id,
    reason: reason
  })
  return request({
    url: '/entryformaudit/unpassSignup',
    method: 'post',
    data: postData
  })
}
// 获取报名者的已报名活动
export function getAuditOfParticipant (name) {
  let postData = qs.stringify({
    name: name
  })
  return request({
    url: '/entryformaudit/getAuditOfParticipant',
    method: 'post',
    data: postData
  })
}
