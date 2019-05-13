import request from '@/utils/request'
import qs from 'qs' // qs用于对参数进行处理

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
