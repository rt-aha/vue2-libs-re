// 引入type，避免function衝突
import * as type from '@/store/types';

export default {
  namespaced: true,
  state: {
    isSidebarOpen: false,
  },
  mutations: {
    [type.handleIsSidebarOpen](state, payload) {
      state.isSidebarOpen = payload.isOpen;
    },
  },
};
