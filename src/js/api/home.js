import fly from './config';

export default {
  // 今日任务
  getMyToDayHomework(params){
    return fly.get('/service/lite/student/getMyToDayHomework', params);
  },
  // 投票
  saveMyVoted(params){
    return fly.post('/service/lite/student/saveMyVoted', params);
  },
  // 更新消息状态
  resStatus(params){
    return fly.post(' /service/lite/student/resStatus', params);
  },
  // 最新通知
  getNewNotice(params){
    return fly.get('/service/lite/student/getNewNotice', params);
  },
  // 消息列表
  getMyNoticeList(params){
    return fly.get('/service/lite/student/getMyNoticeList', params);
  },
  // 获取扫码班级
  getClassMessage (params) {
    return fly.get('/service/base/student/getClassMessage', params)
  },
  // 班级ID入班申请
  entryById (params) {
    return fly.post('/service/base/student/entryById',params)
  },
  // 填写信息入班
  entryByInfo (params) {
    return fly.post('/service/base/student/entryByInfo', params)
  }
}
