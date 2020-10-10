import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: '/api',
  // withCredentials: true, // 允许服务器请求头携带Cookies,但是会出现区域拒绝问题
  timeout: 6000 // 请求超时时间,单位毫秒
})

// 以下部分用于是否登录验证
// request拦截器
service.interceptors.request.use(
  config => {
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      Accept: 'application/json, text/plain, */*'
    }
    return config
  }, error => {
    console.log('request错误:' + error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  // 请求失败
  error => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    } else {
      // console.log('response错误:' + response)
      return '404'
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
    }
  }
)
/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      // toLogin();
      break
      // 404请求不存在
    case 404:
      // message.error('请求的资源不存在', 5);
      break
    default:
      console.log(other)
  }
}

export default service
