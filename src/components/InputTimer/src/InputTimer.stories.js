import ReInputTimer from './InputTimer.vue';

export default {
  title: 'Re-UI/ReInputTimer',
  component: ReInputTimer,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReInputTimer },
  template: '<re-InputTimer v-bind="$props" >按鈕</re-InputTimer>',
});

export const Primary = Template.bind({});
Primary.args = {

};
