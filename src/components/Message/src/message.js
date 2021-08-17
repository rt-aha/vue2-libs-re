import Vue from 'vue';
import Message from '@/components/Message/src/Message.vue';

const MessageConstructor = Vue.extend(Message);

let instances = [];
let count = 0;

const MessageInstance = () => {
  if (Vue.prototype.$isServer) return;

  const instance = new MessageConstructor({});
  let verticalOffset = 16;

  const id = `message_${(count += 1)}`;

  instance.onClose = () => {
    MessageInstance.close(id);
  };

  instances.forEach((item) => {
    verticalOffset += item.$el.offsetHeight + 16;
  });
  console.log('verticalOffset', id, verticalOffset);

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
    console.log(id, dom.$el.style.top);
    if (dom.id === id) {
      const offsetTop = dom.$el.style.top.replace('px', '');
      console.log('offsetTop', offsetTop);
      removeHeight = Number(offsetTop) + 16;
    }
  });

  console.log('---');

  instances = instances.filter((dom) => dom.id !== id);

  instances.forEach((dom) => {
    if (dom.id !== id) {
      dom.verticalOffset = dom.verticalOffset - removeHeight - 16;
    }
  });
};

export default MessageInstance;
