import request from '@/utils/request'
import qs from 'qs' // qs用于对参数进行处理
// 添加自定义报名项
export function addEntryItem (form) {
  let postData = qs.stringify({
    name: form.name,
    type: form.type,
    isrequired: form.isrequired,
    reminder: form.reminder,
    creator: form.creator,
    options: form.options,
    length: form.options.length
  })
  return request({
    url: '/entryitem/addEntryItem',
    method: 'post',
    data: postData
  })
}
// 我的自定义报名项查询
export function myEntryItems (name) {
  let postData = qs.stringify({
    name: name
  })
  return request({
    url: '/entryitem/myEntryItems',
    method: 'post',
    data: postData
  })
}
// 系统自定义报名项查询
export function systemEntryItems () {
  return request({
    url: '/entryitem/systemEntryItems',
    method: 'post'
  })
}
// 报名项搜索
export function searchItem (name, creator, type) {
  let postData = qs.stringify({
    name: name,
    creator: creator,
    type: type
  })
  return request({
    url: '/entryitem/searchItem',
    method: 'post',
    data: postData
  })
}
// 更新报名项
export function updateEntryItem (form) {
  let postData = qs.stringify({
    id: form.uid,
    name: form.uname,
    isrequired: form.uisrequired,
    reminder: form.ureminder,
    options: form.uoptions,
    length: form.uoptions.length
  })
  return request({
    url: '/entryitem/updateEntryItem',
    method: 'post',
    data: postData
  })
}
// 删除报名项
export function deleteEntryItem (id) {
  let postData = qs.stringify({
    id: id
  })
  return request({
    url: '/entryitem/deleteEntryItem',
    method: 'post',
    data: postData
  })
}
// 添加活动
export function addActivity (form) {
  let postData = qs.stringify({
    name: form.name,
    organizer: form.organizer,
    organization: form.organization,
    starttime: form.time[0],
    endtime: form.time[1],
    deadline: form.deadline,
    site: form.site,
    detail: form.detail,
    entryform: form.entryform,
    length: form.entryform.length,
    isneedaudit: form.isneedaudit,
    fee: form.fee,
    number: form.number
  })
  return request({
    url: '/activity/addActivity',
    method: 'post',
    data: postData
  })
}
// 获取某组织者审核中活动
export function getUnauditActivities (name) {
  let postData = qs.stringify({
    name: name
  })
  return request({
    url: '/activity/getUnauditActivities',
    method: 'post',
    data: postData
  })
}
// 获取所有审核中活动
export function getAllUnauditActivities () {
  return request({
    url: '/activity/getAllUnauditActivities',
    method: 'get'
  })
}
// 获取未完成活动
export function getUnfinishedActivities (name) {
  let postData = qs.stringify({
    name: name
  })
  return request({
    url: '/activity/getUnfinishedActivities',
    method: 'post',
    data: postData
  })
}
// 获取未结束活动
export function getFinishedActivities (name) {
  let postData = qs.stringify({
    name: name
  })
  return request({
    url: '/activity/getFinishedActivities',
    method: 'post',
    data: postData
  })
}
// 获取某活动的报名项
export function getEntryItemsOfActivity (entryform) {
  let postData = qs.stringify({
    entryformStr: entryform
  })
  return request({
    url: '/entryitem/getEntryItemsOfActivity',
    method: 'post',
    data: postData
  })
}
// 更新活动信息
export function updateActivity (form) {
  let postData = qs.stringify({
    id: form.uid,
    name: form.uname,
    organization: form.uorganization,
    starttime: form.utime[0],
    endtime: form.utime[1],
    deadline: form.udeadline,
    site: form.usite,
    detail: form.udetail,
    entryform: form.uentryform,
    length: form.uentryform.length,
    isneedaudit: form.uisneedaudit,
    fee: form.ufee,
    number: form.unumber
  })
  return request({
    url: '/activity/updateActivity',
    method: 'post',
    data: postData
  })
}
// 删除活动
export function deleteActivity (id) {
  let postData = qs.stringify({
    id: id
  })
  return request({
    url: '/activity/deleteActivity',
    method: 'post',
    data: postData
  })
}
// 查询审核中活动
export function searchUnauditActivities (name, organizer) {
  let postData = qs.stringify({
    name: name,
    organizer: organizer
  })
  return request({
    url: '/activity/searchUnauditActivities',
    method: 'post',
    data: postData
  })
}
// 查询未完成活动
export function searchUnfinishedActivities (name, organizer) {
  let postData = qs.stringify({
    name: name,
    organizer: organizer
  })
  return request({
    url: '/activity/searchUnfinishedActivities',
    method: 'post',
    data: postData
  })
}
// 查询已完成活动
export function searchFinishedActivities (name, organizer) {
  let postData = qs.stringify({
    name: name,
    organizer: organizer
  })
  return request({
    url: '/activity/searchFinishedActivities',
    method: 'post',
    data: postData
  })
}
// 通过活动审核
export function passActivity (id) {
  let postData = qs.stringify({
    id: id
  })
  return request({
    url: '/activity/passActivity',
    method: 'post',
    data: postData
  })
}
// 未通过活动审核
export function unpassActivity (id, reason) {
  let postData = qs.stringify({
    id: id,
    reason: reason
  })
  return request({
    url: '/activity/unpassActivity',
    method: 'post',
    data: postData
  })
}
// 重新审核
export function reauditActivity (id) {
  let postData = qs.stringify({
    id: id
  })
  return request({
    url: '/activity/reauditActivity',
    method: 'post',
    data: postData
  })
}
// 获取所有可报名的活动
export function getCouldSignupActivity () {
  return request({
    url: '/activity/getCouldSignupActivity',
    method: 'get'
  })
}
// 查询可报名活动
export function searchCouldSignupActivity (select, value) {
  let postData = qs.stringify({
    select: select,
    value: value
  })
  return request({
    url: '/activity/searchCouldSignupActivity',
    method: 'post',
    data: postData
  })
}
// 活动报名
export function signupActivity (form) {
  let postData = qs.stringify(form)
  return request({
    url: '/entryformaudit/signupActivity',
    method: 'post',
    data: postData
  })
}
// 活动归档
export function archiveActivity (id) {
  let postData = qs.stringify({
    id: id
  })
  return request({
    url: '/activity/archiveActivity',
    method: 'post',
    data: postData
  })
}
// 获取正在进行中的活动进行签到管理
export function getSigninActivity (organizer) {
  let postData = qs.stringify({
    organizer: organizer
  })
  return request({
    url: '/activity/getSigninActivity',
    method: 'post',
    data: postData
  })
}
// 获取活动信息
export function getActivityInfo (activity, organizer) {
  let postData = qs.stringify({
    organizer: organizer,
    activity: activity
  })
  return request({
    url: '/activity/getActivityInfo',
    method: 'post',
    data: postData
  })
}
