import ReDatePicker from './DatePicker.vue';

export default {
  title: 'Re-UI/ReDatePicker',
  component: ReDatePicker,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReDatePicker },
  template: '<re-DatePicker v-bind="$props" >按鈕</re-DatePicker>',
});

export const Primary = Template.bind({});
Primary.args = {

};
