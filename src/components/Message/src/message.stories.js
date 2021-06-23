import Remessage from './message.vue';

export default {
  title: 'Re-UI/Remessage',
  component: Remessage,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Remessage },
  template: '<re-message v-bind="$props" >按鈕</re-message>',
});

export const Primary = Template.bind({});
Primary.args = {

};
