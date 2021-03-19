// 引入type，避免function衝突
import * as type from '@/store/types';

export default {
  namespaced: true,
  state: {
    EXAMPLE: true,
  },
  mutations: {
    [type.EXAMPLE](state, payload) {
      state.EXAMPLE = payload;
    },
  },
};
