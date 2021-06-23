import Reavatar from './src/avatar.vue';

/* istanbul ignore next */
Reavatar.install = (Vue) => {
  Vue.component(Reavatar.name, Reavatar);
};

export default Reavatar;
