// 引入type，避免function衝突
import * as type from '@/store/types';
import { handleTpltAPI } from '@/services/tpltService';

export default {
  namespaced: true,
  state: {
    tpltData: 0,
  },
  getters: {
    stateGetter(state) {
      return { getter: state.date };
    },
  },
  mutations: {
    [type.tplt](state, payload) {
      state.tpltData = payload;
    },
  },
  actions: {
    async handleTpltAction({ commit }) {
      const res = await handleTpltAPI();
      console.log('res', res);
      commit(type.tplt, res);
    },
  },
};
