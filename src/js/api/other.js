import fly from './config';

export default {
  // 我的视频收藏
  getMyCollectVideo(params){
    return fly.get('/service/lite/student/getMyCollectVideo', params);
  },
  // 我的足迹列表
  getLearnStep(params){
    return fly.get('/service/lite/student/getLearnStep', params);
  },
  // 视频收藏列表
  getMyCollectVideoList(params){
    return fly.get('/service/lite/student/getMyCollectVideoList', params);
  },
  // 获取同班用户
  getClassmate: function (params) {
    return fly.get('/service/lite/student/getClassmate', params)
  },
  // 退出班级
  quitClassys: function (params) {
    return fly.post('/service/lite/student/quitClass', params)
  }
}
