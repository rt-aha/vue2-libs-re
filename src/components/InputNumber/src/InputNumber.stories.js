import ReInputNumber from './InputNumber.vue';

export default {
  title: 'Re-UI/ReInputNumber',
  component: ReInputNumber,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReInputNumber },
  template: '<re-InputNumber v-bind="$props" >按鈕</re-InputNumber>',
});

export const Primary = Template.bind({});
Primary.args = {

};
