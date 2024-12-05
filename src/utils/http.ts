import Axios from 'axios'
// import VueCookies from 'vue-cookies'
import { showFailToast, showSuccessToast, showLoadingToast, closeToast } from 'vant'


const axios = Axios.create({
  baseURL: import.meta.env['VITE_BASE_URL'],
});
const reqFn = (config: any) => {
  // const token = VueCookies.get('token') || ''
  // config.headers.token = token
  // config.cookies = VueCookies.set('token', '42d0ed5f-3817-4a54-a426-1d1b023ae523')
  return config
}

// 响应拦截函数，接收响应对象为参数，用于根据响应结果做出相应操作
// 响应成功(status === 2xx)时会被调用
const resFn = res => {
  // const { success, message, msg } = res.data
  const { code, msg, message } = res.data
  // 请求成功
  if (code === 0) {
    // if (isShowMsg && (msg || message)) {
    //   showSuccessToast({
    //     message: msg || message,
    //     duration: 2000,
    //   })
    // }
    return res
  }
  // 请求失败的情况
  if (msg || message) {
    showFailToast({
      message: msg || message,
      duration: 2000,
    })
  }
  return Promise.reject(res)
}

// 请求/响应 错误的函数（Status Code 失败情况）
const errorFn = (msg = '') => error => {
  if (error?.response) {
    const { status, statusText } = error.response
    const errorInfo = `${statusText}\n${status}`
    showFailToast({
      message: status ? errorInfo : msg,
      duration: 2000,
    })
  } else {
    showFailToast({
      message: '响应超时',
      duration: 2000,
    })
  }
  return Promise.reject(error)
}

// 请求/响应拦截器
axios.interceptors.request.use(reqFn, errorFn('请求出错，请稍后重试'))
axios.interceptors.response.use(resFn, errorFn('响应出错\n请稍后重试'))

// 请求方法
const REQ = function ({ method = 'POST', url, data = {}, isShowLoading = true, ...rest } = {}) {
  let toast = null
  isShowLoading && (toast = showLoadingToast({
    duration: 0,
    forbidClick: true,
  }))
  return new Promise((resolve, reject) => {
    axios({
      method,
      url,
      [method.toUpperCase() === 'GET' ? 'params' : 'data']: data,
      ...rest,
    }).then(res => {
      resolve(res?.data?.data || res?.data)
    }).catch(error => {
      reject(error)
    }).finally(() => {
      toast && closeToast()
    })
  })
}

export {
  REQ,
}

export default REQ
