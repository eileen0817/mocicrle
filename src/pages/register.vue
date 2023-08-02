<template>
  <view :class="['wx-register-page', { 'white-page': step == 1 }]">
    <view v-show="step == 1">
      <u-form :model="form" ref="uForm" :error-type="errorType">
        <u-form-item prop="userName" :border-bottom="false"><u-input v-model="form.userName"
            placeholder="请输入手机号" /></u-form-item>
        <u-form-item prop="mobileCode" :border-bottom="false" class="relative-line"><u-input v-model="form.password"
            placeholder="请输入验证码" /><auto-verification :check="check" postUrl="/wx/personal/getMobileCode" /></u-form-item>
        <u-form-item prop="password" :border-bottom="false"><u-input v-model="form.password" placeholder="请输入登录密码"
            type="password" /></u-form-item>
        <u-form-item prop="password" :border-bottom="false"><u-input v-model="form.password" placeholder="请再次输入登录密码"
            type="password" /></u-form-item>
      </u-form>
      <u-button :custom-style="customStyle" @click="nextStep">下一步</u-button>
      <view class="opreate-bottom">
        <view>已有账号，<text>立即登录</text></view>
        <view><text class="icon-my-weixin"></text>微信登录</view>
      </view>
    </view>
    <view v-show="step == 2">
      <view class="white-page">
        <u-form :model="form" ref="uForm" :error-type="errorType">
          <u-form-item prop="userName" :border-bottom="false"><u-input v-model="form.userName"
              placeholder="请输入姓名" /></u-form-item>
          <u-form-item prop="store" :border-bottom="false"><u-input v-model="form.store" type="select" placeholder="请选择门店"
              @click="storeChoose = true" /></u-form-item>
        </u-form>
        <view class="identity-panel">
          <view>身份选择<text class="tip">(多选项)</text></view>
          <view class="identity-choose">
            <view @click="chooseIdentity(1)">
              <view :class="['identity-icon', 'icon-worker', { 'active': form.identity == 1 }]"></view>
              <text>我是员工</text>
            </view>
            <view @click="chooseIdentity(2)">
              <view :class="['identity-icon', 'icon-shopowner', { 'active': form.identity == 2 }]"></view>
              <text>我是员工</text>
            </view>
          </view>
        </view>
      </view>
      <view class="button-box">
        <u-button :custom-style="customStyle" @click="nextStep">提交审核</u-button>
      </view>

    </view>
    <u-select v-model="storeChoose" :list="storeList" @confirm="chooseStore"></u-select>
  </view>
</template>

<script>
export default {
  data() {
    let validator = this.$utils.validator;
    return {
      step: 2,
      storeChoose: false,
      // 表单
      form: {
        mobileNumber: '',
        userName: '',
        password: '', // 密码
        mobileCode: '', // 验证码（仅手机快捷登录需要）
        store: '',
        identity: ''
      },
      // 按钮自定义样式
      customStyle: {
        backgroundColor: 'black',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '32',
        marginTop: '37px',
        marginBottom: '40px',
        borderColor: 'black'
      },
      errorType: ['border-bottom', 'toast'],
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
      storeChoose: false,
      storeList: [
        {
          value: '1',
          label: '江'
        },
        {
          value: '2',
          label: '湖'
        }
      ],
    };
  },
  onLoad() {

  },
  // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
  methods: {
    // 点击下一步
    nextStep() {
      const self = this
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          self.step++;
        }
      })
    },
    // 确认门店选择
    chooseStore(e) {
      this.form.store = e[0].label;
      this.store = e[0].value
    },
    chooseIdentity(v) {
      this.form.identity = v
    }
  },
};
</script>

<style lang="scss" scoped>
.wx-register-page {
  min-height: 100vh;

  &.white-page,
  .white-page {
    padding: 100upx 30upx 30upx;
    background: #fff;
  }

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

  .identity-panel {
    padding: 46upx 30upx;
    color: #333;
    font-size: 30upx;
    font-weight: bold;

    .tip {
      color: #ff0000;
      margin-left: 20upx;
      font-weight: normal;
    }

    .identity-choose {
      display: flex;
      align-items: center;
      margin-top: 54upx;
      font-weight: normal;
      font-size: 26upx;
      text-align: center;

      &>view {
        margin-right: 110upx;
      }
    }

    .identity-icon {
      width: 136upx;
      height: 136upx;
      margin-bottom: 24upx;
      position: relative;
      border-radius: 16upx;
      border: solid 4upx #000000;

      &.icon-worker {
        background: url('~@/assets/img/login/worker.png') center center no-repeat;
        background-size: 100%;
      }

      &.icon-shopowner {
        background: url('~@/assets/img/login/shopowner.png') center center no-repeat;
        background-size: 100%;
      }

      &.active::after {
        content: '';
        position: absolute;
        right: -4upx;
        top: -4upx;
        width: 32upx;
        height: 26upx;
        background: url('~@/assets/img/login/check.png') center center no-repeat;
        background-size: 100%;
      }
    }
  }

  .button-box {
    display: flex;
    padding: 0 30upx;
    .u-btn{
      width: 100%;
    }
  }
}
</style>
