import ReButton from './Button.vue';

export default {
  title: 'Re-UI/ReButton',
  component: ReButton,
  argTypes: {
    type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
    size: { control: { type: 'select', options: ['default', 'small'] } },
    round: { control: { type: 'select', options: ['none', 'default', 'round'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReButton },
  template: '<re-button v-bind="$props">按鈕</re-button>',
});

export const Primary = Template.bind({});
Primary.args = {
  // disabled: false,
  // round: 'default',
  // isLoading: false,
  // size: '',
};
