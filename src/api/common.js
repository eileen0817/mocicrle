import {
  request
} from '@/utils/request'
/**
 * @description 用code获取token
 */
export function uploadDelete(data) {
  return request({
    url: `/app-api/app/file/delete`,
    method: 'delete',
    data
  })
}