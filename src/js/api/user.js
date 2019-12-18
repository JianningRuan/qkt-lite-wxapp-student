import fly from './config'

export default {
  // 登录
  login:function (params) {
    return fly.post("/security/wechat",params);
  },
  // 切换角色
  change(params){
    return fly.post('/security/change', params);
  },
  // 获取可以切换的学生
  getStudentList(params){
    return fly.get('/service/lite/student/getStudentList', params);
  },
  // 设置页面
  getSetting(params){
    return fly.get('/service/lite/student/getSetting', params);
  },
  // 发送验证码
  send(params) {
    return fly.get('/service/lite/validate/send', params)
  },
  // 新增修改信息
  updateStu(params) {
    return fly.post('/service/lite/register/updateStu', params)
  },
  // 获取地区
  area(params) {
    return fly.get('/service/lite/register/area', params)
  },
  // 获取地区学校
  school(params) {
    return fly.get('/service/lite/register/school', params)
  },
  // 补充资料
  updateInfo(params) {
    return fly.post('/service/lite/register/updateInfo', params)
  }
}
