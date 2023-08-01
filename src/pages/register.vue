<template>
  <view class="wx-register-page">
    <u-form :model="form" ref="uForm" :error-type="errorType">
      <u-form-item prop="userName" :border-bottom="false"><u-input v-model="form.userName"
          placeholder="请输入手机号" /></u-form-item>
      <u-form-item prop="mobileCode" :border-bottom="false" class="relative-line"><u-input v-model="form.password"
          placeholder="请输入验证码" /><auto-verification :check="check" postUrl="/wx/personal/getMobileCode" /></u-form-item>
      <u-form-item prop="password" :border-bottom="false"><u-input v-model="form.password" placeholder="请输入密码"
          type="password" /></u-form-item>
      <u-form-item prop="password" :border-bottom="false"><u-input v-model="form.password" placeholder="请输入密码"
          type="password" /></u-form-item>
    </u-form>
    <u-button :custom-style="customStyle">下一步</u-button>
    <view class="opreate-bottom">
        <view>已有账号，<text>立即登录</text></view>
        <view><text class="icon-my-weixin"></text>微信登录</view>
      </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
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
        marginTop: '26px',
        marginBottom: '40px',
        borderColor: 'black'
      },
    };
  },
  onLoad() {

  },
  // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
  onReady() {
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.wx-register-page {
  background: #fff;
  padding: 100upx 30upx 30upx;

  /deep/ .u-form-item {
    padding: 28upx 0;

    &>.u-form-item__body {
      background-color: #f4f5f7;
      border-radius: 16upx;
      padding: 2upx 30upx;
    }
  }

  .relative-line {
    position: relative;

    /deep/ .u-form-item__body {
      padding-right: 200upx;
    }
  }
  .opreate-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 28upx;
    color: #999999; 

    text {
      color: #ff6600;
    }

    .icon-my-weixin {
      color: #00c800;
      font-size: 46upx;
      vertical-align: middle;
      margin-right: 12upx;
    }
  }
}
</style>
