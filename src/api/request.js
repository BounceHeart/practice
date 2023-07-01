//引入axios:
import axios from 'axios'
//引入qs
import qs from 'qs'
import Vue from 'vue'
// import $router from "../../router/index.js";

//开发环境
if (process.env.NODE_ENV == 'development') {
  Vue.prototype.imgHost = "http://localhost:3000"
}
//生产环境
if (process.env.NODE_ENV == 'production') {
  Vue.prototype.imgHost = ""
}
//请求拦截器：
// axios.interceptors.request.use(config => {
//   console.log('本次请求地址为：' + config.url);
//   //获取本地存储的tocken:
//   let curTocken = localStorage['userInfo'] ? JSON.parse(localStorage['userInfo']).token : '';
//   if (curTocken) {
//       config.headers.authorization = curTocken;
//   }

//   return config;
// });

//响应拦截器：
// axios.interceptors.response.use(config => {

//   if (config.data.code == 403) { //登录失效或访问路由受限
//       $router.push('/dologin');
//   }

//   return config;
// });

//使用axios发送get请求： 
export function sendGet(url, params = {}, headers = {}) {
  return axios.get(url, {
    params,
    headers //通过请求头传参，比如：传令牌
  })
}


//使用axios发送post请求： 
export function sendPost(url, datas = {}, isFile = false, headers = {}) {
  let params = '';
  if (isFile) {  //datas参数中含有文件上传
    let forms = new FormData();
    for (let keys in datas) {
      forms.append(keys, datas[keys])
    }
    params = forms
  } else {  //datas参数中不含文件上传
    params = qs.stringify(datas);
  }

  return axios.post(url, datas, params, {
    headers: {
      'Content-Type': 'application/json'
    }  //通过请求头传参，比如：传令牌
  })
}