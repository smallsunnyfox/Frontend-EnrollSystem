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
export function getHasreadNoti (name) {
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
export function deleteHasreadNoti (id) {
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
export function readNotification (id) {
  let postData = qs.stringify({
    id: id
  })
  return request({
    url: '/notification/readNotification',
    method: 'post',
    data: postData
  })
}
