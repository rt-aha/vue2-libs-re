import ReButton from '../components/Button';

export default {
  title: 'ReUI/ReButton',
  component: ReButton,
  argTypes: {
    type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReButton },
  template: '<re-button>按鈕</re-button>',
});

export const Primary = Template.bind({});
Primary.args = {
  // disabled: false,
  // round: false,
  // isLoading: false,
  // size: '',
};
