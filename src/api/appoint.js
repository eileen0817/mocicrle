import {
  request
} from '@/utils/request' 
 
/**
 * @description 获取须知
 */
export function noticeInfo(data) {
  return request({
    url: `/app-api/business/app/appoint/notice/get`,
    method: 'get',
    data
  })
}
/**
 * @description 获取可预约日期 1--个人 2--团队 3--活动 
 */
export function appointDate(data) {
  return request({
    url: `/app-api/business/app/appoint/get/date`,
    method: 'get',
    data
  })
}

/**
 * @description 获取可预约日期 1--个人 2--团队 3--活动 
 */
export function getSessionByDate(data) {
  return request({
    url: `/app-api/business/app/appoint/get/date/sessions`,
    method: 'get',
    data
  })
}

/**
 * @description 获取联系人列表
 */
export function relationList(data) {
  return request({
    url: `/app-api/app/appoint/member/relation/list`,
    method: 'get',
    data
  })
}

/**
 * @description 添加联系人
 */
export function relationAdd(data) {
  return request({
    url: `/app-api/app/appoint/member/relation/add`,
    method: 'get',
    data
  })
}
/**
 * @description 编辑联系人
 */
export function relationEdit(data) {
  return request({
    url: `/app-api/app/appoint/member/relation/update`,
    method: 'get',
    data
  })
}
/**
 * @description 删除联系人
 */
export function relationDelete(data) {
  return request({
    url: `/app-api/app/appoint/member/relation/delete`,
    method: 'get',
    data
  })
}

/**
 * @description 联系人详情
 */
export function relationDetail(data) {
  return request({
    url: `/app-api/app/appoint/member/relation/get`,
    method: 'get',
    data
  })
}

/**
 * @description 预约
 */
export function appointSave(data) {
  return request({
    url: `/app-api/app/appoint/action/appoint`,
    method: 'post',
    data,
    options:{
      json:true
    }
  })
}

/**
 * @description 联系人详情
 */
export function recordPage(data) {
  return request({
    url: `/app-api/app/appoint/record/page`,
    method: 'get',
    data
  })
}
/**
 * @description 预约记录详情
 */
export function recordDetail(data) {
  return request({
    url: `/app-api/app/appoint/record/get`,
    method: 'get',
    data
  })
}

/**
 * @description 取消预约
 */
export function recordCancel(data) {
  return request({
    url: `/app-api/app/appoint/record/cancelAppoint`,
    method: 'get',
    data
  })
}




