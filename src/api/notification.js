import request from '@/utils/request'
import qs from 'qs' // qs用于对参数进行处理
// 获取某组织者的未读通知
export function getNotiofOrganizer (name) {
  let postData = qs.stringify({
    name: name
  })
  return request({
    url: '/notification/unreadnotiOfOrganizer',
    method: 'post',
    data: postData
  })
}
// 获取某组织者的已读通知
export function getHasreadNotiofOrganizer (name) {
  let postData = qs.stringify({
    name: name
  })
  return request({
    url: '/notification/hasreadnotiOfOrganizer',
    method: 'post',
    data: postData
  })
}
// 删除某组织者的已读通知
export function deleteHasreadNotiofOrganizer (id) {
  let postData = qs.stringify({
    id: id
  })
  return request({
    url: '/notification/deleteHasreadnotiOfOrganizer',
    method: 'post',
    data: postData
  })
}
// 通知组织者审核通过的消息
export function notiPassActivity (id, sender) {
  let postData = qs.stringify({
    id: id,
    sender: sender
  })
  return request({
    url: '/notification/notiPassActivity',
    method: 'post',
    data: postData
  })
}
// 通知组织者审核未通过的消息
export function notiUnpassActivity (id, reason, sender) {
  let postData = qs.stringify({
    id: id,
    reason: reason,
    sender: sender
  })
  return request({
    url: '/notification/notiUnpassActivity',
    method: 'post',
    data: postData
  })
}
// 已读通知
export function readNotificationofOrganizer (id) {
  let postData = qs.stringify({
    id: id
  })
  return request({
    url: '/notification/readNotification',
    method: 'post',
    data: postData
  })
}
// 通知报名者审核通过的消息
export function notiPassSignup (id, sender) {
  let postData = qs.stringify({
    id: id,
    sender: sender
  })
  return request({
    url: '/notification/notiPassSignup',
    method: 'post',
    data: postData
  })
}
// 通知报名者审核未通过的消息
export function notiUnpassSignup (id, reason, sender) {
  let postData = qs.stringify({
    id: id,
    reason: reason,
    sender: sender
  })
  return request({
    url: '/notification/notiUnpassSignup',
    method: 'post',
    data: postData
  })
}
// 获取某报名者的未读通知
export function getNotiofParticipant (name) {
  let postData = qs.stringify({
    name: name
  })
  return request({
    url: '/notification/getNotiofParticipant',
    method: 'post',
    data: postData
  })
}
// 获取某报名者的已读通知
export function getHasreadNotiofParticipant (name) {
  let postData = qs.stringify({
    name: name
  })
  return request({
    url: '/notification/getHasreadNotiofParticipant',
    method: 'post',
    data: postData
  })
}
// 删除某报名者的已读通知
export function deleteHasreadNotiofParticipant (id) {
  let postData = qs.stringify({
    id: id
  })
  return request({
    url: '/notification/deleteHasreadNotiofParticipant',
    method: 'post',
    data: postData
  })
}
// 报名者已读通知
export function readNotificationofParticipant (id) {
  let postData = qs.stringify({
    id: id
  })
  return request({
    url: '/notification/readNotificationofParticipant',
    method: 'post',
    data: postData
  })
}
