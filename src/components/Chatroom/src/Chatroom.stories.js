import ReChatroom from './Chatroom.vue';

export default {
  title: 'Re-UI/ReChatroom',
  component: ReChatroom,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReChatroom },
  template: '<re-Chatroom v-bind="$props" >按鈕</re-Chatroom>',
});

export const Primary = Template.bind({});
Primary.args = {

};
