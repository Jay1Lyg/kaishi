import axios from 'axios'
import { Message } from 'element-ui'
import  gloable  from '@/gloable'

var that = this;
const host='http://www.kaishi.net.cn';
const service = axios.create({
    baseURL:host, //gloable baseURL
    timeout:5000, //request timeout
    headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
    transformRequest: [function (data, headers) {
      //转换data数据的数据格式，一般返回一个序列化的字符串
      //axios内封装了一个qs模块，引入后可以直接转换
      return data;
  }],
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

service.postMsg = function (api_url,canshu,isUserid){
  var that = this;
  let promise = new Promise ((resolve,reject)=>{
    var formData = new FormData();
    
    for(let m in canshu){
      formData.append(m,canshu[m]);
    }
    that.post("/program/"+api_url,formData)
    .then(function (res) {
      resolve(res)
    }, function (res) {
      Message({
        message: '亲，请求失败了！请检查你的网络！',
        type: 'error',
        duration: 3 * 1000
      })
    });
  });
  return promise;
}


export default service