// request 封装 
import {
  config
} from '../config/index' //导入配置  
const tips = {
  1: '抱歉，出现了一个错误，请联系管理员',
  200: '服务器成功返回请求数据',
  201: '新建或修改数据成功',
  202: '一个请求已经进入后台排队(异步任务)',
  204: '删除数据成功',
  400: '发出信息有误',
  401: '用户没有权限(令牌失效、用户名、密码错误、登录过期)',
  402: '令牌过期',
  403: '用户得到授权，但是访问是被禁止的',
  404: '访问资源不存在',
  406: '请求格式不可得',
  410: '请求资源被永久删除，且不会被看到',
  500: '服务器发生错误',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
}
let axiosPromiseArr = []


//请求相关默认配置 
const option = {
  loading: true, //是否显示加载框
  json: false, // 是否开启 json 格式
  space: true, // 是否过滤参数空格
  error: true, // 是否开启错误提示
  loadingText: '正在加载中', //加载中提示文字
  prefix: true
}

function request({
  url,
  method = 'GET',
  data = {},
  options = option
}) {
  try {
    options = Object.assign({}, option, options);
    return service(url, data, method, options);
  } catch (e) {
    wx.showToast({
      title: '抱歉，出现了一个错误',
      icon: 'none',
      duration: 3000
    });
  }
}

function service(url, data, method, option) {
  const {
    space,
    json,
    error,
    loadingText
  } = option
  // console.log(loading)
  return new Promise(async (resolve, reject) => {
    // 过滤空格
    if (data && space) {
      for (const item in data) {
        (space[item] !== false && !!data[item] && typeof data[item] == 'string') && (data[item] = data[item].replace(/\s|&nbsp;/g, ''))
      }
    }

    !axiosPromiseArr.length && uni.showLoading({
      title: loadingText,
      mask: true
    })
    axiosPromiseArr.push(url)
    let token = uni.getStorageSync('token');
    if (!token && config.whiteApiList.indexOf(url) == -1) {
      uni.redirectTo({
        url: '/pages/authorization'
      });
    }
    const header = {
      'tenant-id': 1,
      'Authorization': `Bearer ${token}`,
      'content-type': `application/${json ? 'json' : 'x-www-form-urlencoded'}`
    }

    uni.request({
      url: `/cphApi${url}`,
      data,
      method,
      header,
      complete(res) {
        axiosPromiseArr.pop();
        !axiosPromiseArr.length && wx.hideLoading()
        resolve(checkStatusCode(res, error))
      },
      fail(res) {
        resolve(checkStatusCode(res, error))
      }
    })

  })

} 

function checkStatusCode(res, error) {
  const {
    code = res.statusCode, msg = tips[res.statusCode] || '系统错误', data = null
  } = res.data || {}
  if (code === 200) return res.data

  // 403：未登录，402 401：强制下线
  if (code === 403 || code === 402 || code === 401) {
    wx.setStorageSync('token', '')
    uni.redirectTo({
      url: '/pages/authorization'
    });
  }

  error && uni.showToast({
    title: msg || tips[code],
    icon: 'none',
    duration: 3000
  })

  return {
    code,
    msg,
    data
  }
}



module.exports = {
  request: request
}