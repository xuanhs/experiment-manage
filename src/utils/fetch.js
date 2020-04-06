/* eslint-disable no-console */
// // request拦截器

import axios from 'axios'
import { Message } from 'element-ui';
import router from '@/router/index.js'
// import Message from '@/components/message'
// import router from '@/router/front/index'
// axios.defaults.withCredentials = true //允许跨域携带cookie
// 创建axios实例
const service = axios.create({
  timeout: null // 请求超时时间
})
let serviceTips = '服务器超时'

// request拦截器
service.interceptors.request.use(
  config => {

    // 设置请求头
    
    // console.log('头部请求::::',config.url,config.headers,config.params,config.method);
    // console.log('config.opts-------------->',config,config.timeout);

    // config.headers['commons'] = 'commons'

    // if(config.headers.opts==true){
    //   // 自定义headers
    //   config.headers['father'] = 'father'
    //   delete config.headers.opts
    // }
    // else{
    //   // 与自定义相斥的headers
    //   config.headers['mother'] = 'mother'
    // }
    // 是否携带token
    // let tokenFlag = true
    // if (config.url.indexOf('?time') < 1) {
    //   if (config.url.indexOf('?') < 1) {
    //     config.url += '?time=' + new Date().getTime()
    //   } else {
    //     config.url += '&time=' + new Date().getTime()
    //   }
    // } else {
    //   if (config.url.indexOf('?') < 1) {
    //     config.url += '&time3=' + new Date().getTime()
    //   } else {
    //     if (config.url.indexOf('time') < 1) {
    //       config.url += '&time4=' + new Date().getTime()
    //     }
    //   }
    // }

    // 是否修改请求信息
    // if (config.opts) {
    //   // 获取携带token状态
    //   tokenFlag = config.opts ? config.opts.token : true
    //   // 获取请求头
    //   headers = config.opts.Header ? config.opts.Header : 'application/json'
    //   // 拓展头部参数
    //   let Head = config.opts.Head
    //   if (Head) {
    //     for (let key in Head) {
    //       config.headers[key] = Head[key]
    //     }
    //   }
    // }

    // if (token && tokenFlag) {
    //   // 条件允许，携带token请求
    //   config.headers['X-Auth0-Token'] = token
    // } else {
    //   headers = config.opts.beforeLogin === true ? 'application/json' : 'application/x-www-form-urlencoded'
    // }
    var token = localStorage.getItem('accesstoken')
    // console.log('token',token)
    var tokenFlag = config.headers.tokenFlag    //默认是false
    if(token || tokenFlag){
      config.headers['accessToken'] = token
    }

    if(!token && !tokenFlag){
      // this.$message('')
      // Message({
      //   message:'token不能为空',
      //   type:'error',
      //   duration:1000
      // });
    }

    // 设置请求格式
    let headers = config.headers['Content-Type']?config.headers['Content-Type']:'application/json'
    
    config.headers['Content-Type'] = headers
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 服务器响应拦截器
service.interceptors.response.use(
  response => { 
    if(response.data.code  == 401){
      router.replace({
        path:'/login'
      })
    }
    return response
  },
  error => {
    if (error.response) {

      switch (error.response.code) {
        case 401:
          error.response.data = '登录超时，请重新登录！'
          this.$router.push({
            path:'/login'
          })
          // router.replace({
          //   path: '/login',
          //   query: {
          //     // redirect: router.currentRoute.fullPath
          //   } // 登录成功后跳入浏览的当前页面
          // })
          break
        case 404:
          error.response.data = '资源不存在'
          break
        case 406:
          error.response.data = '头部无携带token'
          break
        case 412:
          // 拦截错误 并重新跳入登页重新获取token
          // router.replace({
          //   path: '/login',
          //   query: {
          //     redirect: router.currentRoute.fullPath
          //   } // 登录成功后跳入浏览的当前页面
          // })
          error.response.data = '秘钥失效'
          localStorage.removeItem('tokendata') // 清除token
          break
        case 415:
          error.response.data = '请求type有误'
          break
        case 500:
          error.response.data = '服务器异常'
          break
      }
      serviceTips = error.response.data
      console.log('serviceTips',serviceTips)
    }
    Message({
      message:serviceTips,
      type:'error',
      duration:1000
    });
    
    return Promise.reject(serviceTips)
  }
)
export default service
