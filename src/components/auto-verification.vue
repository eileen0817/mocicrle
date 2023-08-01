<template>
  <view class="verification-components">
    <view :disabled="configLock.lock" :class="['verification-button', configLock.lock && 'is-disabled']" @click="sendCode">{{ configLock.lockText || configLock.text }}</view>
  </view>
</template>

<script>
export default { 
  props: {
    time: {
      type: Number,
      default: 60,
    },
    text: {
      type: String,
      default: '发送验证码',
    },
    lockText: {
      type: String,
      default: '',
    },
    check: {
      type: Function,
      // default: (callback) => {
      //   return callback({});
      // },
    },
    postUrl: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      timer: null,
      configLock: {
        lock: true, // 控制锁（默认 true）
        time: this.time, // 锁定时间（默认 60 秒）
        text: this.text, // 按钮名称
        lockText: '', // 锁定时的提示语
      },
    };
  },
  mounted() {
    const self = this;

    self.$nextTick(self.lockTime);
  },
  methods: {
    lockTime(v) {
      const self = this;
      if (v) {
        try {
          uni.setStorageSync('lockTime', self.configLock.time);
        } catch (e) {
          //TODO handle the exception
        }
      }

      let Storage_data = uni.getStorageSync('lockTime'); //同步
      if (Storage_data) {
        self.configLock.lock = true;
        self.configLock.time = Storage_data;

        self.timer = setInterval(function () {
          self.configLock.time--;
          uni.setStorage({ key: 'lockTime', data: self.configLock.time });

          self.configLock.lockText = self.lockText || `还剩 ${self.configLock.time} 秒`;
          if (!self.configLock.time) {
            self.configLock.time = self.$options.data.call(self).configLock.time;
            self.configLock.lockText = '';
            self.configLock.lock = false;
            uni.removeStorage({ key: 'lockTime' });
            clearInterval(self.timer);
          }
        }, 1000);
      } else {
        self.configLock.lock = false;
      }
    },
    sendCode() {
      const self = this; 
      if (self.configLock.lock) return;

      const params = self.check((params) => { 
        if (!params) return; 
        self.$http.post(this.postUrl, params).then((res) => { 
          const { status, data, message } = res;

          if (status == 200) {
            self.lockTime(true);
            self.$emit('callback', data); 
          }
        });
      });
    },
  },
};
</script>

<style lang="scss">
.verification-components {
  overflow: hidden;
  display: inline-block;
  position: absolute;
  right: 30upx;
  top: 30upx; 
  .verification-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    color: #ff6600; 
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    font-weight: 500; 
    font-size: 30upx;
    border-radius: 8upx;
    &.is-disabled {
      opacity: 0.7;
    }
  }
}
</style>