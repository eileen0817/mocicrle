import {
  request
} from '@/utils/request'
/**
 * @description 用code获取token
 */
export function getToken(data) {
  return request({
    url: `/app-api/member/auth/wx/wx-oauth`,
    method: 'get',
    data
  })
}

/**
 * @description 获取当前登录者用户
 */
export function loginUserInfo(data) {
  return request({
    url: `/app-api/member/auth/wx/user-info`,
    method: 'get',
    data
  })
} 
// 场馆基本信息
/**
 * @description banner - 列表
 */
export function bannerPage(data) {
  return request({
    url: `/app-api/business/app/museum/base/banner/list`,
    method: 'get',
    data
  })
}

/**
 * @description 场馆资讯 - 列表
 */
export function newsPage(data) {
  return request({
    url: `/app-api/business/app/information/page`,
    method: 'get',
    data
  })
}

/**
 * @description 新闻资讯 - 详情
 */
export function newsDetail(data) {
  return request({
    url: `/app-api/business/app/information/get`,
    method: 'get',
    data
  })
}

/**
 * @description 通知公告 - 列表
 */
export function noticePage(data) {
  return request({
    url: `/app-api/business/app/notice/page`,
    method: 'get',
    data
  })
}

/**
 * @description 通知公告 - 详情
 */
export function noticeDetail(data) {
  return request({
    url: `/app-api/business/app/notice/get`,
    method: 'get',
    data
  })
}


/**
 * @description 科教活动 - 列表
 */
export function activityPage(data) {
  return request({
    url: `/app-api/business/app/science/activity/page`,
    method: 'get',
    data
  })
}

/**
 * @description 场馆介绍
 */
export function baseInfo(data) {
  return request({
    url: `/app-api/business/app/museum/base/info/get`,
    method: 'get',
    data
  })
}

/**
 * @description 交通路线
 */
export function routeInfo(data) {
  return request({
    url: `/app-api/business/app/museum/base/route/query`,
    method: 'get',
    data
  })
}

/**
 * @description 交通路线
 */
export function tourNotice(data) {
  return request({
    url: `/app-api/business/app/museum/base/tour/notice/get`,
    method: 'get',
    data
  })
}

