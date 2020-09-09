export default {
  name: 'TableExpand',
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number,
    config: {
      type: Object,
      default: null,
    },
  },
  // ctx 即上層傳下來的
  render: (h, ctx) => {
    console.log('h', h);
    console.log('ctx', ctx);

    const params = {
      row: ctx.props.row,
      index: ctx.props.index,
    };

    if (ctx.props.config) {
      params.config = ctx.props.config;
    }

    return ctx.props.render(h, params);
  },
};
