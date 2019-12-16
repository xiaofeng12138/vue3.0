import axios from 'axios';
import {getCookie,getUsername} from '@/utils/cookie'

import {
  Message
} from 'element-ui';

const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi'; //判断是dev 还是pro 环境

const service = axios.create({
  baseURL: BASEURL,
  timeout: 50000,
});

/**
 * 添加请求拦截器
 */

console.log(process.env.NODE_ENV)

/*
 请求接口前 做一些处理  （请求拦截器）
*/
service.interceptors.request.use(function (config) {
  config.headers['tokey'] = getCookie()
  config.headers['UserName'] = getUsername()

  return config

}, function (error) {
  return Promise.reject(error);
});


//添加响应拦截器 
/*
  请求接口后，返回数据进行拦截
*/
service.interceptors.response.use(function (response) {

  let data = response.data;
  if (data.resCode !== 0) {
    Message.error(data.message)
    return Promise.reject(data)
  } else {
    return response
  }
}, function (error) {
  return Promise.reject(error);
});

export default service;