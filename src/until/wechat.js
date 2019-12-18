
// const qiniuUploader = require("./qiniuUploader-min");
import COS from 'cos-wx-sdk-v5'//腾讯云cos上传sdk
import api from '@/js/api/until'

let wechat={
  getSetting:()=>{
    return new Promise((resolve,reject)=>{
      wx.getSetting(
        {
          success:(res)=>{
            resolve(res.authSetting);
          }
        }
      )
    })
  },
  toast:(title,duration,mask)=>{
    duration=duration?duration:1500;
    return new Promise((resolve,reject)=>{
      wx.showToast(
        {
          title:title,
          icon:'none',
          mask:mask?mask:false,
          duration:duration
        }
      );
      setTimeout(()=>{
        resolve();
      },duration)
    })
  },
  getAuth:()=>{
    return new Promise((resolve,reject)=>{
      let token=wx.getStorageSync('token');
      if(token && token !==''){
        resolve(true);
      }else{
        resolve(false);
      }
    })
  },
  getLoginCode:()=>{
    return new Promise((resolve => {
      wx.login({
        success (res) {
          if (res.code) {
            resolve(res.code)
          } else {
            resolve(null);
          }
        }
      })
    }))
  },
  token:null,
  chooseImage(count){
    return new Promise((resolve,reject)=>{
      wx.chooseImage({
        count: count||9,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success :(res)=>{
          // tempFilePath可以作为img标签的src属性显示图片
          // let base64s=[];
          // let FileSystemManager=wx.getFileSystemManager();
          // res.tempFilePaths.map((item=>{
          //   let type = item.replace(/.+\./, "").toLowerCase();
          //   let base64=FileSystemManager.readFileSync(item,'base64');
          //   base64s.push(`data:image/${type};base64,${base64}`);
          // }));
          resolve(res.tempFilePaths);
        }
      })
    })
  },
  /*chooseImage(count){
    return new Promise((resolve,reject)=>{
      wx.chooseImage({
        count: count||9,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          let base64s=[];
          let FileSystemManager=wx.getFileSystemManager();
          res.tempFilePaths.map((item=>{
            let type = item.replace(/.+\./, "").toLowerCase();
            let base64=FileSystemManager.readFileSync(item,'base64');
            base64s.push(`data:image/${type};base64,${base64}`);
          }));
          resolve({paths:res.tempFilePaths,base64s:base64s});
        },
        fail(res){
          console.log('失败', res);
        }
      })
    })
  },*/
  //type 文件类型	number	1图片 2音频 3视频 4文档
  //folderName 分类文件夹	string	work:作业 notice:通知
  upload(fileList,type=1,folderName='work'){
    return new Promise(async (resolve)=>{
      // 初始化实例
      var cos = new COS({
        getAuthorization: async (options, callback) =>{
          // 异步获取签名
          let res= await api.qcloudAuth();
          var data = res.data.data;
          callback({
            TmpSecretId: data.credentials && data.credentials.tmpSecretId,
            TmpSecretKey: data.credentials && data.credentials.tmpSecretKey,
            XCosSecurityToken: data.credentials && data.credentials.sessionToken,
            ExpiredTime: data.expiredTime,
          });
        }
      });
      var uploadList=[];
      fileList.map((item)=>{
        uploadList.push(
          new Promise(async(resolveItem)=>{
            var key=item;
            var isUploaded=true;
            if(item.indexOf('http://tmp/')>=0){
              isUploaded=false;
              key=item.split('http://tmp/');
              key=key[key.length-1];
            }else {
              if(item.indexOf('wxfile://tmp_')>=0){
                isUploaded=false;
                key=item.split('wxfile://tmp_');
                key=key[key.length-1];
              }
            }

            if(isUploaded){
              resolveItem(item);
            }else{
              // let result= await api.upload({fileKey:key,folderName:folderName,type:type});
              let result= await api.qcloud({fileKey:key,folderName:folderName,type:type});
              cos.postObject({
                Bucket: result.data.bucket,
                Region: result.data.region,
                Key: result.data.bucketKey,
                FilePath: item,
                onProgress: function (info) {
                  console.log(JSON.stringify(info));
                }
              }, function (err, data) {
                resolveItem(data.Location);
                console.log(err || data);

              });
              //七牛上传
              /*qiniuUploader.upload(item, (res) => {
                resolveItem(res.imageURL);
              }, (error) => {
                console.log('error: ' + error);
                error(error);
              }, {
                region: 'SCN',
                domain: result.data.bucketDomain, // // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
                key: result.data.bucketKey,
                uptoken: result.data.token, // 由其他程序生成七牛 uptoken
              });*/
            }
          })
        )
      });
      wx.showLoading({
        title: '加载中',
        mask:true
      });
      let results=await Promise.all(uploadList);
      wx.hideLoading();
      resolve(results);
    })

  },
  async getUserId(){
    return new Promise((resolve,reject)=>{
      let userId=wx.getStorageSync('userId');
      if(userId && userId!==''){
        resolve(userId);
      }else{
        resolve(null);
      }
    })
  },
  getGradeList:()=>{
    return [
      {key:'全部年级',value:0},
      {key:'一年级',value:1},
      {key:'二年级',value:2},
      {key:'三年级',value:3},
      {key:'四年级',value:4},
      {key:'五年级',value:5},
      {key:'六年级',value:6},
      {key:'初一年级',value:7},
      {key:'初二年级',value:8},
      {key:'初三年级',value:9},
    ]
  },
  async setUserId(){
    let res=await this.getAuth();
    if(res){
      // let result=await gql.query({query:`query getUserId{getUserId}`});
      if(result.getUserId){
        wx.setStorageSync('userId', result.getUserId);
      }
    }
  },
  showModal(title){
    return new Promise((resolve,reject)=>{
      wx.showModal({
        title: '提示',
        content: title,
        success (res) {
          if (res.confirm) {
            resolve(true);
          } else if (res.cancel) {
            resolve(false);
          }
        }
      })
    })
  },
  message:{
    success(title){
      wx.showToast({
        title: title,
        icon: 'success',
        duration: 1500
      })
    }
  },
  getView(target){
    return new Promise((resolve,reject)=>{
      const query = wx.createSelectorQuery()
      query.select(target).boundingClientRect()
      query.selectViewport();
      query.exec(function(res){
        resolve(res);
      })
    })
  },
  /**
   * 方法说明
   * @getAuthorize 微信授权
   * @scopeName {string} 需要获取权限的scope
   * https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html#scope-%E5%88%97%E8%A1%A8
   * 授权成功返回 true 失败false
   */
  getAuthorize(scopeName){
    return new Promise(resolve => {
      wx.getSetting({
        success(res) {
          if (!res.authSetting[scopeName]) {
            wx.authorize({
              scope: scopeName,
              success() {
                // 用户已经同意小程序获取权限
                resolve(true);
              },
              fail(res) {
                console.log(`用户拒绝授权${scopeName}`,res);
                resolve(false);
              }
            })
          }else{
            resolve(true);
          }
        }
      })
    })
  },

};

export default wechat;
