import fly from './config'

export default {
  // 获取我的的阅读指导
  ruleList:function (params) {
    return fly.get("/service/lite/exercises/queryRuleList",params);
  },
  geniusRuleList:function (params) {
    return fly.get("/service/lite/exercises/queryGeniusRuleList",params);
  },
  issueList:function (params) {
    return fly.get("/service/lite/exercises/queryRandomExercisesList",params);
  },
  submitAnswer:function (params) {
    return fly.get("/service/lite/exercises/submitAnswer",params);
  },
  result:function (params) {
    return fly.get("/service/lite/exercises/getAnswerResult",params)
  }
}
