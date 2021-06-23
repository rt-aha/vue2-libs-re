import Vue from 'vue';
import Message from '@/components/Message/src/Message.vue';

const MessageConstructor = Vue.extend(Message);

let instances = [];
let count = 0;

const MessageInstance = () => {
  if (Vue.prototype.$isServer) return;

  const instance = new MessageConstructor({});
  let verticalOffset = 20;

  const id = `message_${(count += 1)}`;

  instance.onClose = () => {
    MessageInstance.close(id);
  };

  instances.forEach((item) => {
    verticalOffset += item.$el.offsetHeight + 20;
  });
  instance.verticalOffset = verticalOffset;
  instance.id = id;
  instance.$mount();
  document.body.appendChild(instance.$el);

  instances.push(instance);
};

MessageInstance.close = (id) => {
  // const instancesLength = instances.length;
  let removeHeight = 0;

  instances.forEach((dom) => {
    if (dom.id === id) {
      const offsetTop = dom.$el.style.top.replace('px', '');
      console.log('offsetTop', offsetTop);
      removeHeight = Number(offsetTop) + 20;
    }
  });

  instances = instances.filter((dom) => dom.id !== id);

  instances.forEach((dom) => {
    if (dom.id !== id) {
      dom.verticalOffset = dom.verticalOffset - removeHeight - 20;
    }
  });
};

export default MessageInstance;
