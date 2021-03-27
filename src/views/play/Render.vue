<script>
import InnerRender from '@/views/play/InnerRender.vue';

export default {
  name: 'Render',
  components: {
    InnerRender,
  },
  props: {
    msg: {
      type: String,
    },
  },
  methods: {
    handleClick() {
      console.log('handleClick');
    },
  },
  render(h) {
    return h('div', {}, [
      h('div', {}, 'start !'),
      h('inner-render', {
        scopedSlots: {
          default: (props) => {
            console.log('props...', props);
            return h('span', {}, 'changed default');
          },
          extra: (props) => {
            console.log('props...', props);
            return h('span', {}, props.data.value);
          },
        },
      }),
      h('div', {}, 'end !'),
    ]);
  },
};
</script>

<style lang="scss">
.render-text {
  color: #f00
}
</style>
