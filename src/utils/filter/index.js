export default {
  install(Vue) {
    const prototype = Vue.prototype;

    // 时间戳转化为时间格式
    Vue.filter('formatDate', (value, format) => prototype.$utils.date.formatDate(value, format))

    // 数据为空格式转换
    Vue.filter('filterEmpty', v => v != null && v !== '' ? v : '--')

    // 根据时间显示周
    Vue.filter('filterTurnWeek', v => {
      var weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

      if (/-|\//g.test(v)) {
        v = v.replace(/-/g, '/');
        v = new Date(v).getTime()
      }

      v = new Date(v).getDay();

      return weekday[v]
    })
 
    Vue.filter('filterPhone', v => v.replace(/(\d{3})\d{6}(\d{2})/, '$1****$2'))
    Vue.filter('filterIdCard', v => v.replace(/(\d{6})\d{10}(\d{2})/, '$1********$2'))
  }
}