import ReSwitch from './Switch.vue';

export default {
  title: 'Re-UI/ReSwitch',
  component: ReSwitch,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReSwitch },
  template: '<re-switch v-bind="$props" >按鈕</re-switch>',
});

export const Primary = Template.bind({});
Primary.args = {
  // disabled: false,
  // round: 'default',
  // isLoading: false,
  // size: '',
};
