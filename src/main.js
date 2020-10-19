// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import echarts from 'echarts'
 
Vue.prototype.$echarts = echarts 

import '../src/style/custom.less'

Vue.config.productionTip = false

Vue.use(Antd)
//Vue.use(Vis)

router.beforeEach((to, from, next) => {
    //  matched的数组中包含$route对象的检查元字段
    //  arr.some() 表示判断该数组是否有元素符合相应的条件, 返回布尔值
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // 判断当前是否有登录的权限
        // console.log('id-token:' + store.state.token)
        if (store.state.mode == 'A') {
          // console.log('fullPath:' + to.fullPath)
            next()
        } else if (store.state.mode == 'B'){
			next()
		} else {
			next({
			    path: '/',
			    query: { redirect: to.fullPath }
			})
        }
    } else {
        next() // 确保一定要调用 next()
    }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
