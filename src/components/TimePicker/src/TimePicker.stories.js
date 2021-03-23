import ReTimePicker from './TimePicker.vue';

export default {
  title: 'Re-UI/ReTimePicker',
  component: ReTimePicker,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReTimePicker },
  template: '<re-TimePicker v-bind="$props" >按鈕</re-TimePicker>',
});

export const Primary = Template.bind({});
Primary.args = {

};
