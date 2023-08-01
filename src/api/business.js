import {
  request
} from '@/utils/request' 
/**
 * @description 科教活动 - 列表
 */
export function actvityPage(data) {
  return request({
    url: `/app-api/business/app/science/activity/page`,
    method: 'get',
    data
  })
}
/**
 * @description 科教活动 - 详情
 */
export function activityDetail(data) {
  return request({
    url: `/app-api/business/app/science/activity/get`,
    method: 'get',
    data
  })
}

/**
 * @description 剧目影视 - 列表
 */
export function cinemaPage(data) {
  return request({
    url: `/app-api/business/app/cinema/page`,
    method: 'get',
    data
  })
}

/**
 * @description 剧目影视 - 详情
 */
export function cinemaDetail(data) {
  return request({
    url: `/app-api/business/app/cinema/get`,
    method: 'get',
    data
  })
}

/**
 * @description 影视详情 
 */
export function filmDetail(data) {
  return request({
    url: `/app-api/business/app/cinema/repertoire/get`,
    method: 'get',
    data
  })
}


/**
 * @description 根据影院获取影片列表 
 */
export function getFilmsByCinema(data) {
  return request({
    url: `/app-api/business/app/cinema/repertoire/list`,
    method: 'get',
    data
  })
}

/**
 * @description 展厅 - 列表
 */
export function hallPage(data) {
  return request({
    url: `/app-api/business/app/exhibition/hall/page`,
    method: 'get',
    data
  })
}

/**
 * @description 展厅 - 详情
 */
export function hallDetail(data) {
  return request({
    url: `/app-api/business/app/exhibition/hall/get`,
    method: 'get',
    data
  })
}
/**
 * @description 获取展品列表
 */
export function getExhibitsByHall(data) {
  return request({
    url: `/app-api/business/app/exhibition/display/page`,
    method: 'get',
    data
  })
}
/**
 * @description 获取展品详情
 */
export function disiplayDetail(data) {
  return request({
    url: `/app-api/business/app/exhibition/display/get`,
    method: 'get',
    data
  })
}





