export default {
  // uni-app 除了 h5 之外暂不支持自定义指令
  // https://uniapp.dcloud.io/use?id=%e5%85%a8%e5%b1%80-api
  install(Vue) {
    Vue.directive('demo', {
      bind(el, binding, vnode, oldVnode) {
        console.log('-------^_^--------');
        //el.innerHTML = binding.value
      }
    })

    // 自动适配高度-微信端
    Vue.directive('autoWeChatHeight', {
      inserted(el, binding, vnode) {
        // console.log('clientHeight')
        const siblings = vnode.context.$autoWeChatHeight = () => {
          const clientHeight = document.querySelector('page').offsetHeight; 
          const children = el.parentNode.children;
          const getCss = vnode.context.$utils.getCss;
          let h = 0;

          [].forEach.call(children, v => {
            const style = getCss(v) || {};

            v !== el && !/fixed|absolute/g.test(style.position) && (h += v.offsetHeight);
            style.marginTop && (h += parseInt(style.marginTop.replace(/px/, '')));
            style.marginBottom && (h += parseInt(style.marginBottom.replace(/px/, '')));
          });

          vnode.context.$nextTick(function () {
            let elTabsHeader = getCss('.el-tabs__header');

            if (elTabsHeader) {
              h += parseInt(elTabsHeader.height.replace(/px/, ''));
              elTabsHeader.marginTop && (h += parseInt(elTabsHeader.marginTop.replace(/px/, '')));
              elTabsHeader.marginBottom && (h += parseInt(elTabsHeader.marginBottom.replace(/px/, '')));
            }

            el.style.height = (clientHeight - h) + 'px';
            vnode.context[binding.expression] = (clientHeight - h);
          })
        }

        siblings();
        window.onresize = siblings;
      },
      update(el, binding, vnode) {
        vnode.context.$autoWeChatHeight()
      }
    });

  }
}