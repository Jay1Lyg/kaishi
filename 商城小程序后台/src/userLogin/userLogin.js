import service from '../utils/require'
import { Message } from 'element-ui'
import  gloable  from '../gloable'

function userLogin (userName,upwd,_that){
  var params = new URLSearchParams();
  params.append('email', userName);
  params.append('password', upwd);
  service.post(gloable.api.login,params).then(function (res) {
    sessionStorage.setItem('user_id', res.data.user_id);//缓存user_id
    _that.$router.push({path:'/Release'})//跳转
  }, function (res) {
    Message({
      message: '密码或同户名错误！',
      type: 'error',
      duration: 3 * 1000
    })
  });
}

export default userLogin