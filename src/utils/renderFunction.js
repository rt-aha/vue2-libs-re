export default {
  name: 'RenderFunction',
  functional: true,
  props: {
    // params: Object,
    render: Function,
  },
  render: (h, ctx) => ctx.props.render(h),
};
