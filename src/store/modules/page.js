const TYPES = {
  SET_HW_PAGE: 'SET_HW_PAGE',
  SET_HW_INDEX: 'SET_HW_INDEX',
  SET_HW_DATE: 'SET_HW_DATE',
  SET_VIDEO_INDEX: 'SET_VIDEO_INDEX',
};

const initialState  = {
  hwIndex: '',
  videoIndex: '',
};

const getters = {
  hwIndex(state) {
    return state.hwIndex
  },
  videoIndex(state) {
    return state.videoIndex
  }
};

const actions = {
  setHwIndex({commit, state}, hwIndex){
    return commit(TYPES.SET_HW_INDEX, hwIndex)
  },
  setVideoIndex({commit, state}, videoIndex){
    return commit(TYPES.SET_VIDEO_INDEX, videoIndex)
  }
};

const mutations = {
  [TYPES.SET_HW_INDEX](state, hwIndex){
    return {
      ...state,
      hwIndex
    }
  },
  [TYPES.SET_VIDEO_INDEX](state, videoIndex){
    return {
      ...state,
      videoIndex
    }
  }
};

export default {
  state: initialState ,
  getters,
  actions,
  mutations,
}
