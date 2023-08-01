<template>
  <view :class="['nodata-components', { 'page-center': isPageCenter }]">
    <view class="no-data"></view>
  </view>
</template>

<script>
export default {
  props: {
    isPageCenter: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  mounted() {
    const self = this;
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.nodata-components {
  //  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 100upx;

  .no-data {
    width: 304upx;
    height: 311upx;
    background: url('~@/assets/img/public/noData.png') center center no-repeat;
    background-size: 100%;
    margin-top: 100upx;
  }

  &.page-center {
    position: absolute;
    top: 20%;
    left: 0;
    right: 0;
    margin-top: -76upx;
    padding-bottom: 0;

    .no-data {
      margin-top: 200upx;
    }
  }


}</style>