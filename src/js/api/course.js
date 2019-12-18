import fly from './config';

export default {
  // 获取系列课程
  getList(params){
    return fly.get('/service/platform/getCourse', params);
  },
  getCourseLesson(params){
    return fly.get('/service/platform/getCourseLesson', params);
  },
  getVideoDetail(params){
    return fly.get('/service/platform/getVideoDetail', params);
  },
  getRelationList(params){
    return fly.get('/service/platform/getVideoRelevant', params);
  },
  videoCollect(params){
    return fly.post('/service/platform/updateCollect', params,{headers:{'Content-Type': 'application/x-www-form-urlencoded' /*charset=UTF-8*/}});
  },
  videoLike(params){
    return fly.post('/service/platform/updateLike', params);
  },
  updateVideoBrowse(params){
    return fly.post('/service/platform/updateVideoBrowse', params,{headers:{'Content-Type': 'application/x-www-form-urlencoded' /*charset=UTF-8*/}});
  }
}
