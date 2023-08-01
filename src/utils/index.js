 
import AutoDirective from './directive'
import AutoFilter from './filter'
import AutoMixins from './mixins' 
export default {
  install: function (Vue) {
    const use = [ AutoDirective, AutoFilter, AutoMixins]
    use.forEach(v => Vue.use(v))

    const $vm = { ...Vue.prototype }
    Vue.prototype.$utils = new this.Prototype($vm)
  },
  Prototype: class Prototype {
    constructor($vm) {
      this.$vm = $vm
      this.trim = String.prototype.trim
    }

    
    /**
    * 获取 IP + 端口 + 目录
    * @param  { Boolean }     path      是否追加地址之后的目录
    **/
    origin(options) {
      options = {
        path: false,
        ...options
      }

      const { protocol, hostname, port, pathname } = window.location;
      return `${protocol}//${hostname + (port ? ':' + port : '')}${options.path ? pathname.replace(/\/$/g, '') : ''}`
    }

    /* 
     *获取 flex 设置 justify-content: space-between 布局后需要补差的 flex-item 数量，使最后一行按从左往右顺序排列
     * self 实例
     * parentClass 父级类名
     * childClass  子级类名
     */
    reCalcPaddingLength(self, parentClass, childClass) {
      return new Promise((resolve, reject) => {
        uni.getSystemInfo({
          success(res) {
            uni.createSelectorQuery().in(self).select(parentClass).boundingClientRect(data => {
              uni.createSelectorQuery().in(self).selectAll(childClass).boundingClientRect(data2 => {
                let outerLength = data.width // 外面div的宽度
                let listLen = data2.length // 子元素总个数，自己调整即可
                let lineCapacity = Math.floor(outerLength / self.$utils.getPX({ devWidth: res.windowWidth, fixed: 0, value: 165 }))
                resolve(listLen % lineCapacity === 0 ? 0 : (lineCapacity - listLen % lineCapacity))
              }).exec()
            }).exec()
          }
        })
      })
    }

    // 日期补零
    zeroPad(n) {
      return String(n < 10 ? '0' + n : n)
    }

    // 日期相关方法
    get date() {
      var self = this;
      var now = new Date();               // 当前日期
      var nowDayOfWeek = now.getDay();    // 今天本周的第几天
      var nowDay = now.getDate();         // 当前日
      var nowMonth = now.getMonth();      // 当前月
      var nowYear = now.getYear();        // 当前年
      nowYear += (nowYear < 2000) ? 1900 : 0;

      return {
        getTimeStamp() {
          return parseInt(new Date().getTime())
        },
        /**
         * 获得当前日期
         * @returns
         */
        getNowDay(str) {
          return this.formatDate(new Date(), str || 'yyyy-mm-dd');
        },
        /**
         * 获得本周的开始时间
         * @returns
         */
        getStartDayOfWeek() {
          var day = nowDayOfWeek || 7;
          return this.formatDate(new Date(now.getFullYear(), nowMonth, nowDay + 1 - day), 'yyyy-mm-dd');
        },
        /**
         * 获得本周的结束时间
         * @returns
         */
        getEndDayOfWeek() {
          var day = nowDayOfWeek || 7;
          return this.formatDate(new Date(now.getFullYear(), nowMonth, nowDay + 7 - day), 'yyyy-mm-dd');
        },
        /**
         * 获得本月的开始时间
         * @returns
         */
        getStartDayOfMonth() {
          var monthStartDate = new Date(nowYear, nowMonth, 1);
          return this.formatDate(monthStartDate, 'yyyy-mm-dd');
        },
        /**
         * 获得本月的结束时间
         * @returns
         */
        getEndDayOfMonth() {
          var monthEndDate = new Date(nowYear, nowMonth, this.getMonthDays());
          return this.formatDate(monthEndDate, 'yyyy-mm-dd');
        },
        /**
        * 获得本月天数
        * @returns
        */
        getMonthDays() {
          var monthStartDate = new Date(nowYear, nowMonth, 1);
          var monthEndDate = new Date(nowYear, nowMonth + 1, 1);
          var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
          return days;
        },
        // 获取下一年的今天的日期
        getLastYearToday(date) {
          var strYear = new Date(date).getFullYear() + 1;
          var strDay = new Date(date).getDate();
          var strMonth = new Date(date).getMonth() + 1;
          if (strMonth < 10) {
            strMonth = '0' + strMonth;
          }

          if (strDay < 10) {
            strDay = '0' + strDay;
          }

          var datastr = strYear + '-' + strMonth + '-' + strDay;
          return datastr
        },
        // 获取一年前的今天的日期
        getPreYearToday(date) {
          var strYear = new Date(date).getFullYear() - 1;
          var strDay = new Date(date).getDate();
          var strMonth = new Date(date).getMonth() + 1;
          if (strMonth < 10) {
            strMonth = '0' + strMonth;
          }
          if (strDay < 10) {
            strDay = '0' + strDay;
          }

          var datastr = strYear + '-' + strMonth + '-' + strDay;
          return datastr
        },
        /**
        * @param 格式化日期时间
        * @value   { Date }    标准格式的日期，也可以是例如（2020-05-10）这种格式
        * @format  { String }  格式化 yyyy-mm-dd hh:MM:ss
        * @returns
        */
        formatDate(value, format) {
          var dateTime, yyyy, mm, dd, hh, MM, ss, day, am_pm, AM_PM, week, WEEK;
          var weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
          var weekday2 = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
          format = format || 'yyyy-mm-dd hh:MM:ss';

          if (/-/g.test(value)) {
            value = value.replace(/-/g, '/');
            value = new Date(value).getTime()
          }
          value = Number(value);

          //时间戳不为数字类型，返回空
          if (!value) {
            return '';
          }

          dateTime = new Date(value);
          yyyy = dateTime.getFullYear();
          mm = dateTime.getMonth() + 1;
          dd = dateTime.getDate();
          hh = dateTime.getHours();
          MM = dateTime.getMinutes();
          ss = dateTime.getSeconds();
          day = dateTime.getDay();

          // 是否显示上午和下午
          if (/am\/pm/.test(format)) {
            am_pm = hh > 12 ? '下午' : '上午';
            hh = hh > 12 ? hh - 12 : hh;
          }

          // 是否显示AM和PM
          if (/AM\/PM/.test(format)) {
            AM_PM = hh > 12 ? 'AM' : 'PM';
            hh = hh > 12 ? hh - 12 : hh;
          }

          // 是否显示星期几
          if (/week/.test(format)) {
            week = weekday[day];
          }

          // 是否显示周几
          if (/WEEK/.test(format)) {
            WEEK = weekday2[day];
          }

          format = format.replace('yyyy', yyyy);       					// 年
          format = format.replace('mm', mm < 10 ? '0' + mm : mm);   	// 月
          format = format.replace('dd', dd < 10 ? '0' + dd : dd);		// 日
          format = format.replace('hh', hh < 10 ? '0' + hh : hh);		// 时
          format = format.replace('MM', MM < 10 ? '0' + MM : MM);		// 分
          format = format.replace('ss', ss < 10 ? '0' + ss : ss);		// 秒
          format = format.replace('am/pm', am_pm);		            // 上午、下午
          format = format.replace('AM/PM', AM_PM);		            // AM、PM
          format = format.replace('week', `&nbsp;&nbsp;&nbsp;${week}`);// 周
          format = format.replace('WEEK', `&nbsp;&nbsp;&nbsp;${WEEK}`);// 周
          return format;
        },
        /**
        * @param 获得当前日期并且对日期进行 +- 
        * @diff  { Number }  可以是正数或负数，表示对当前日期进行 +-
        * @date  { Date }    标准格式的日期，也可以是例如（2020-05-10）这种格式
        * @returns
        */
        getNowDate(diff, date) {
          date = date || new Date();
          if (/-/g.test(date)) {
            date = date.replace(/-/g, '/');
            date = new Date(date)
          }

          var year = date.getFullYear(), month = date.getMonth() + 1, strDate = date.getDate();
          var dateNew = new Date(date.setDate(date.getDate() + (diff || 0)));
          var yearNew = dateNew.getFullYear(), monthNew = dateNew.getMonth() + 1, strDateNew = dateNew.getDate();

          function getBetweenDateStr(start, end) {
            start = start.split('-'), end = end.split('-');

            if (new Date(start[0], (start[1] - 1), start[2]).getTime() > new Date(end[0], (end[1] - 1), end[2]).getTime()) {
              const vl = [start, end];
              start = vl[1];
              end = vl[0];
            }

            start = start[0] + '-' + self.zeroPad(parseInt(start[1])) + '-' + self.zeroPad(parseInt(start[2]));
            end = end[0] + '-' + self.zeroPad(parseInt(end[1])) + '-' + self.zeroPad(parseInt(end[2]));


            var result = [];
            var beginDay = start.split('-');
            var endDay = end.split('-');
            var diffDay = new Date();
            var dateList = new Array;
            var i = 0;
            diffDay.setDate(beginDay[2]);
            diffDay.setMonth(beginDay[1] - 1);
            diffDay.setFullYear(beginDay[0]);
            result.push(start);

            while (i == 0) {
              var countDay = diffDay.getTime() + 24 * 60 * 60 * 1000;
              diffDay.setTime(countDay);
              dateList[2] = diffDay.getDate();
              dateList[1] = diffDay.getMonth() + 1;
              dateList[0] = diffDay.getFullYear();
              if (String(dateList[1]).length == 1) { dateList[1] = "0" + dateList[1] };
              if (String(dateList[2]).length == 1) { dateList[2] = "0" + dateList[2] };
              result.push(dateList[0] + "-" + dateList[1] + "-" + dateList[2]);
              if (dateList[0] == endDay[0] && dateList[1] == endDay[1] && dateList[2] == endDay[2]) {
                i = 1;
              }
            };

            return result;
          }

          const vl = {
            old: { date: `${year}-${self.zeroPad(month)}-${self.zeroPad(strDate)}`, valueOf: new Date(year, (month - 1), strDate).getTime() },
            new: { date: `${yearNew}-${self.zeroPad(monthNew)}-${self.zeroPad(strDateNew)}`, valueOf: new Date(yearNew, (monthNew - 1), strDateNew).getTime() }
          }

          diff && (vl.diff = getBetweenDateStr(year + '-' + month + '-' + strDate, yearNew + '-' + monthNew + '-' + strDateNew))

          return vl
        }
      }
    }

    /**
    * @param 根据视窗宽度转化出对应的 vw 值
    * @devWidth  { Number }  可视窗宽度
    * @value     { Date }    需要转化的值
    * @fixed     { Date }    值转化后保留的小数点位数
    * @returns
    */
    getVW(option) {
      const options = { devWidth: 750, value: 750, fixed: 3, ...option };
      const v = (options.value / options.devWidth) * 100;

      return Number(`${!/\./g.test(v) ? v : v.toFixed(options.fixed)}`);
    }


    /**
    * @param 根据视窗宽度转化出对应的 rpx 值
    * @devWidth  { Number }  可视窗宽度
    * @value     { Date }    需要转化的值
    * @fixed     { Date }    值转化后保留的小数点位数
    * @returns
    */
    getRPX(option) {
      const options = { devWidth: 750, value: 750, fixed: 3, ...option };
      const v = (750 * options.value) / options.devWidth;

      return Number(`${!/\./g.test(v) ? v : v.toFixed(options.fixed)}`);
    }



    /**
    * @param 根据视窗宽度转化出对应的 px 值
    * @devWidth  { Number }  可视窗宽度
    * @value     { Date }    需要转化的值
    * @fixed     { Date }    值转化后保留的小数点位数
    * @returns
    */
    getPX(option) {
      const options = { devWidth: 750, value: 750, fixed: 3, ...option };
      const v = (options.value / 750) * options.devWidth;

      return Number(`${!/\./g.test(v) ? v : v.toFixed(options.fixed)}`);
    }

    // 数组合并，并且去重
    mergeArray(arr1, arr2) {
      var _arr = new Array();

      for (var i = 0; i < arr1.length; i++) {
        _arr.push(arr1[i]);
      }

      for (var i = 0; i < arr2.length; i++) {
        var flag = true;

        for (var j = 0; j < arr1.length; j++) {
          if (arr2[i] == arr1[j]) {
            flag = false;
            break;
          }
        }

        if (flag) {
          _arr.push(arr2[i]);
        }
      }

      return _arr
    }

    /**
    * dispatch 查找父级
    * @param { self } 当前 Vue 实例
    * @param { componentName } 组件名称
    * @return { params } 参数
    */
    dispatch(self, componentName) {
      var parent = self.$parent || self.$root;
      var name = parent.$options.name;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        parent && (name = parent.$options.name);
      }

      parent && (this.component = parent);
      return this.component;
    }

    /**
    * broadcast 查找子级
    * @param { self } 当前 Vue 实例
    * @param { componentName } 组件名称 name
    * @return 匹配到的组件实例
    */
    broadcast(self, componentName) {
      self.$children.forEach(child => {
        var name = child.$options.name;

        if (name === componentName) {
          this.component = child;
        } else {
          this.broadcast(child, componentName);
        }
      });

      return this.component;
    }

    utf16to8(str) {
      var out, i, len, c;
      out = "";
      len = str.length;
      for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
          out += str.charAt(i);
        } else if (c > 0x07FF) {
          out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
          out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
          out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
          out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
          out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
      }
      return out;
    }

    // 过滤掉富文本内容，留下文字
    getOnlyText(data, length) {
      var finalText = '';

      if (data.replace(/<\/?.+?\/?>|&nbsp;|&ldquo;|&rdquo;|&mdash;|&bull;|\s/g, '').length > length) {
        finalText = data.replace(/<\/?.+?\/?>|&nbsp;|&ldquo;|&rdquo;|&mdash;|&bull;|\s/g, '').slice(0, length)
      } else {
        finalText = data.replace(/<\/?.+?\/?>|&nbsp;|&ldquo;|&rdquo;|&mdash;|&bull;|\s/g, '')
      }

      return finalText;
    }
    //深拷贝
    deepCopy(obj) {
      var str = JSON.stringify(obj);
      return JSON.parse(str);
    }
    /**	
    * syncValue 同步对象的源数据到目标对象
    * @param {targetObj} 目标对象
    * @param {sourceObj} 源对象
    */
    syncValue(targetObj, sourceObj) {
      for (var key in targetObj) {
        if (key in sourceObj) {
          targetObj[key] = sourceObj[key];
        }
      }
    }

    // 过滤字符串中的所有空格
    trimSpace(data) {
      return data.replace(/\s/g, "")
    }

    get validator() {
      const self = this;

      return {
        // 验证手机号码
        mobile(rule, value, callback) {
          if (!value) {
            callback();
          } else {
            /^1[3|4|5|7|8|9]\d{9}$/.test(value) ? callback() : callback(rule.message ? rule.message : `手机号码格式不正确`);
          }
        },
        //验证长度多少位到多少位
        lengthMax(rule, value, callback) {
          var min, max, type = rule.type != 'string' ? rule.type : '';
          if (rule.options) {
            rule.options.min && (min = rule.options.min);
            rule.options.max && (max = rule.options.max);
          }
          if (value.length < min || value.length > max) {
            callback(rule.message ? rule.message : `${type}长度在${min}-${max}位`)
          } else {
            callback();
          }
        },
        intgerRange(rule, value, callback) {
          var pattern = /^[1-9][0-9]*$/
          var min, max;
          if (rule.options && (rule.options.min||rule.options.min==0)) {
            min = rule.options.min;
          }
          if (rule.options && rule.options.max) {
            max = rule.options.max;
          }
          if (!value) {
            callback();
          }
          // console.log(value,typeof(value),!Number.isInteger(value),value < min ,value > max)
          if (!pattern.test(value) || value < min || value > max) {
            callback(rule.message ? rule.message : '整数数字' + min + '-' + max);
          } else {
            callback();
          }
        },
        // 允许数字和字母组合
        numAndLetter(rule, value, callback) {
          var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+$/;
          var type = rule.type != 'string' ? rule.type : '';
          if (rule.checkempty != false && $utils.isHasSpace(value)) {
            rule.message = `不能包含空格，仅支持数字+英文组合`
            callback(rule.message);
          } else if (reg.test(value)) {
            callback();
          } else {
            !value ? callback() : callback(rule.message ? rule.message : `${type}必须是数字+英文组合`);
          }
        },
         // 验证身份证
         idCard(rule, value, callback) {
          var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
          if (reg.test(value)) {
            callback();
          } else {
            !value ? callback() : callback('身份证号码格式错误!');
          }
        },
      }
    }
  }
}