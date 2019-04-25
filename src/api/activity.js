import request from '@/utils/request'
import qs from 'qs' // qs用于对参数进行处理

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

export function systemEntryItems () {
  return request({
    url: '/entryitem/systemEntryItems',
    method: 'post'
  })
}

export function searchItemByName (name, creator) {
  let postData = qs.stringify({
    name: name,
    creator: creator
  })
  return request({
    url: '/entryitem/searchItemByName',
    method: 'post',
    data: postData
  })
}

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
    length: form.entryform.length
  })
  return request({
    url: '/activity/addActivity',
    method: 'post',
    data: postData
  })
}
