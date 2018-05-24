import axios from 'axios'
import { Message } from 'element-ui'

var that = this;
const host='http://www.kaishi.net.cn';
const service = axios.create({
    baseURL:host, //gloable baseURL
    timeout:5000, //request timeout
    // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})

service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  Message({
    message: '网络请求失败！',
    type: 'error',
    duration: 3 * 1000
  })
});

export default service