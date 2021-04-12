import ReChatroom from './src/Chatroom.vue';

/* istanbul ignore next */
ReChatroom.install = (Vue) => {
  Vue.component(ReChatroom.name, ReChatroom);
};

export default ReChatroom;
