// 引入type，避免function衝突
import * as type from '@/store/types';
import { handleTpltAPI } from '@/services/tpltService';

export default {
  namespaced: true,
  state: {
    data: 0
  },
  getters: {
    stateGetter(state) {
      return { getter: state.date };
    }
  },
  mutations: {
    [type.template](state, payload) {
      state.data = payload;
    }
  },
  actions: {
    async handleTemplate({ commit }) {
      const res = await handleTpltAPI();
      commit(type.template, res);
    }
  }
};
