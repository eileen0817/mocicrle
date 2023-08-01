<script>
export default {
  onLaunch: function () {
    const self = this;
    // uni.setStorage({
    //   key: 'token',
    //   data:'68433bafa50b4396a6fb40cf7d714140',
    //   success() {
    //   }
    // })
    // #ifndef H5
    // const { top, height } = uni.getMenuButtonBoundingClientRect();
    // self.$store.dispatch('page/changePageInfo', { header: { top, height, topHeight: top + height } });
    // #endif

    // self.$http.post('/behavior/mini-program/open/add')

    console.log('App Launch');
  },
  onShow: function () {
    console.log('App Show');
  },
  onHide: function () {
    console.log('App Hide');
  },
};
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
@import '@/style/css/common.scss';
@import '@/style/css/reset.scss';
@import '@/style/css/custom.scss';

/* #ifdef MP-WEIXIN || APP-PLUS */
::-webkit-scrollbar {
  display: none;
}

/* #endif */

/* 解决H5 的问题 */
/* #ifdef H5 */
uni-scroll-view .uni-scroll-view::-webkit-scrollbar {
  /* 隐藏滚动条，但依旧具备可以滚动的功能 */
  display: none;
}

/* #endif */</style>
