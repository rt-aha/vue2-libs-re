<template>
  <div>
    template

    <p v-get-ele:currency.stock="obj"></p>
    <p v-get-ele:stock="obj"></p>

    {{ cptd }}

    {{ renderComp }}
  </div>
</template>

<script>
// import InnerRender from '@/views/play/InnerRender.vue';

export default {
  name: 'Render',
  components: {
    // InnerRender,
  },
  directives: {
    'get-ele': {
      bind(el, binding, arg3) {
        if (binding.arg === 'currency') {
          el.innerHTML = 'currency';
        }

        if (binding.arg === 'stock') {
          el.innerHTML = 'stock';
        }

        el.focus();
      },
    },
  },
  props: {
    msg: {
      type: String,
    },
  },
  data() {
    return {
      renderComp: 'renderComp',
      color: 'blue',
      type: 'color',
      obj: {
        a: 1,
        b: 2,
      },
    };
  },
  methods: {
    handleClick() {
      console.log('handleClick');
    },
  },
  // render(h) {
  //   return h('div', {}, [
  //     h('div', {}, 'start !'),
  //     h('inner-render', {
  //       scopedSlots: {
  //         default: (props) =>
  //           console.log('props...', props);
  //           h('span', {}, 'changed default'),
  //         extra: (props) =>
  //           // console.log('props...', props);
  //           h('span', {}, props.data.value)
  //         ,
  //       },
  //     }),
  //     h('div', {}, 'end !'),
  //   ]);
  // },
  computed: {
    cptd() {
      console.log('cptd');
      return 'cptd';
    },
  },
  beforeCreate() {
    console.log('beforeCreate');
  },
  created() {
    console.log('created');
  },
  beforeMount() {
    console.log('beforeMount');
  },
  mounted() {
    console.log('mounted');
  },
  beforeUpdate() {
    console.log('beforeUpdate');
  },
  updated() {
    console.log('updated');
  },
  beforeDestroy() {
    console.log('beforeDestroy');
  },
  destroyed() {
    console.log('destroyed');
  },
  watch: {
    renderComp: {
      handler() {
        console.log('watch');
        console.log('this', JSON.parse(JSON.stringify(this.cptd)));
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.render-text {
  color: #f00;
}
</style>
