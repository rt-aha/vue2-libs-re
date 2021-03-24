import ReDateTimePicker from './DateTimePicker.vue';

export default {
  title: 'Re-UI/ReDateTimePicker',
  component: ReDateTimePicker,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReDateTimePicker },
  template: '<re-DateTimePicker v-bind="$props" >按鈕</re-DateTimePicker>',
});

export const Primary = Template.bind({});
Primary.args = {

};
