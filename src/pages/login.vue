<template>
  <view class="wx-login-page">
    <view class="header-panel">
      <view class="header-left">
        <view class="header-title">
          Hello！
        </view>
        <view class="header-subtitle">
          欢迎来到陌圈
        </view>
      </view>
      <view class="header-right"></view>
    </view>
    <view class="login-panel">
      <u-tabs height="60" font-size="32" :list="list" :is-scroll="true" :current="current" @change="changeTab" active-color="#000000"></u-tabs>
      <view v-show="current == 0">
        <u-form :model="form" ref="uForm">
          <u-form-item prop="userName" :border-bottom="false"><u-input v-model="form.userName"
              placeholder="请输入手机号" /></u-form-item>
          <u-form-item prop="password" :border-bottom="false"><u-input v-model="form.password" placeholder="请输入密码"
              type="password" /></u-form-item>
        </u-form>
      </view>
      <view v-show="current == 1">
        <u-form :model="form" ref="uForm" :error-type="errorType">
          <u-form-item prop="userName" :border-bottom="false"><u-input v-model="form.userName"
              placeholder="请输入手机号" /></u-form-item>
          <u-form-item prop="mobileCode" :border-bottom="false"  class="relative-line"><u-input v-model="form.password"
              placeholder="请输入验证码" /><auto-verification :check="check" postUrl="/wx/personal/getMobileCode" /></u-form-item>
        </u-form>
      </view>
      <u-button :custom-style="customStyle">立即登录</u-button>
      <view class="opreate-bottom">
        <view>还没有账号，<text>立即注册</text></view>
        <view><text class="icon-my-weixin"></text>微信登录</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    let validator = this.$utils.validator;
    return {
      errorType: ['border-bottom', 'toast'],
      list: [{
        name: '密码登录'
      }, {
        name: '验证码登录'
      }],
      current: 0,
      // 表单
      form: {
        mobileNumber: '',
        userName: '',
        password: '', // 密码
        mobileCode: '', // 验证码（仅手机快捷登录需要）
      },
      // 按钮自定义样式
      customStyle: {
        backgroundColor: 'black',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '32',
        marginLeft: '15px',
        marginTop: '26px',
        marginBottom: '40px',
        borderColor: 'black'
      },
      rules: {
          userName: [
            {
              required: true,
              message: '手机号不能为空',
              trigger: ['change', 'blur'],
            },
            {
              validator: validator.mobile,
              message: '手机号格式不正确',
              trigger: ['change', 'blur'],
            },
          ],
          password: [
            {
              required: true,
              message: '登录密码不能为空',
              trigger: ['change', 'blur'],
            },
          ],
        },
    };
  },
  onLoad() {

   },
  // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
  methods: {
    // 切换tab
    changeTab(inx) {
      this.current = inx;
    },
    check(callback) {
      const self=this 
      this.$refs.uForm.validate((valid) => {  
        callback(
          valid
            ? { 
                mobileNumber: self.form.userName,
              }
            : false
        );
      });
    },
    // 跳转页面
    navTo(url) {
      uni.navigateTo({
        url
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.wx-login-page {
  padding: 110upx 30upx;
  min-height: 100vh;
  background: url('~@/assets/img/login/bg.jpg') center center no-repeat;
    background-size: 100%;
  .header-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30upx;

    .header-title {
      font-size: 60upx;
    }

    .header-subtitle {
      font-size: 34upx;
      color: #333;
    }
  }

  .header-right {
    width: 193upx;
    height: 163upx;
    background: url('~@/assets/img/login/logo.png') center center no-repeat;
    background-size: 100%;
  }

  .login-panel {
    background-color: #fff;
    border-radius: 16upx;
    padding: 64upx 40upx 118upx 10upx;

    /deep/ .u-tabs {
      margin-bottom: 50upx;
    }

    /deep/ .u-form-item {
      padding: 28upx 0 28upx 15px;

      &>.u-form-item__body {
        background-color: #f4f5f7;
        border-radius: 16upx;
        padding: 2upx 30upx;
      }
    }
    .relative-line{
      position: relative;
    }
  }

  .opreate-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 28upx;
    color: #999999;
    padding-left: 15px;

    text {
      color: #ff6600;
    }
    .icon-my-weixin{
      color: #00c800;
      font-size: 46upx;
      vertical-align: middle;
      margin-right: 12upx;
    }
  }
}
</style>
