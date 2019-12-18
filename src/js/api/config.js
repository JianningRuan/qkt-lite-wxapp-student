// import Fly from 'flyio';
const Fly = require('flyio/dist/npm/wx');
let fly = new Fly;

import wechat from '@/until/wechat'

//添加请求拦截器
fly.interceptors.request.use((config,promise)=>{
  // Add custom headers
  config.headers["access_token"]=wx.getStorageSync('accessToken');
  return config;
});

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
    if(response.data.rcode===405){
      wx.removeStorageSync('accessToken');
      /*wx.showModal({
        title: '提示',
        content: '登录过期，请重新登录',
        showCancel:false,
        success (res) {
          if (res.confirm) {
            wx.reLaunch({
              url: '/pages/login'
            })
          }
        }
      })*/
      wx.reLaunch({
        url: '/pages/login'
      })

    }else if(response.data.rcode===400){
      if(response.data.message){
        wechat.toast(response.data.message)
      }
      return response.data;
      // promise.resolve(response.data);
    }else{
      return response.data;
      // promise.resolve();
    }
  },
  (err) => {
    if(err.status>=500){
      wechat.toast('系统错误，请稍后再试或咨询客服');
    }
    //发生网络错误后会走到这里
    //return Promise.resolve("ssss")
  }
);


// Set the base url
if (process.env.NODE_ENV === 'production') {//正式域名
  fly.config.baseURL = "https://qkt-api.uedu100.com";
} else {//测试域名
  // fly.config.baseURL="http://192.168.20.31:8084"//啊添
  // fly.config.baseURL="http://192.168.20.63:8083/"; //小凤
  // fly.config.baseURL="http://192.168.1.29:8084"//开发
  fly.config.baseURL = "https://qkt-api-test.uedu100.com"//开发
  // fly.config.baseURL="http://172.18.16.232:8083"//锦华
}

export default fly;
