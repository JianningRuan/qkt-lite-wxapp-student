const TYPES = {
  SET_USER_INFO: 'SET_USER_INFO',
  SET_JOIN_CLASS_ID: 'SET_JOIN_CLASS_ID'
}

const initialState  = {
  userInfo: '',
  joinClassId: ''
}

const getters = {
  userInfo(state) {
    return state.userInfo
  },
  joinClassId(state) {
    return state.joinClassId
  }
}

const actions = {
  setUserInfo({commit, state}, userInfo){
    commit(TYPES.SET_USER_INFO, userInfo)
  },
  setJoinClassId({commit, state}, joinClassId) {
    commit(TYPES.SET_JOIN_CLASS_ID, joinClassId)
  }
}

const mutations = {
  [TYPES.SET_USER_INFO](state, userInfo){
    return {
      ...state,
      userInfo
    }
  },
  [TYPES.SET_JOIN_CLASS_ID](state, joinClassId) {
    return {
      ...state,
      joinClassId
    }
  }
}

export default {
  state: initialState,
  getters,
  actions,
  mutations,
}
