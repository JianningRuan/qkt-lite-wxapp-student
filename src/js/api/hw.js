import fly from './config';

export default {
  // 作业列表
  getMyAllHomeworkList(params){
    return fly.get('/service/lite/student/getMyAllHomeworkList', params);
  },
  // 作业详情
  getMyHomeworkDetail(params){
    return fly.get('/service/lite/student/getMyHomeworkDetail', params);
  },
  // 提交作业
  saveMyHomework(params){
    return fly.post('/service/lite/student/saveMyHomework', params);
  }
}
