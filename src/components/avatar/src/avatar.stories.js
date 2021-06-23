import Reavatar from './avatar.vue';

export default {
  title: 'Re-UI/Reavatar',
  component: Reavatar,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Reavatar },
  template: '<re-avatar v-bind="$props" >按鈕</re-avatar>',
});

export const Primary = Template.bind({});
Primary.args = {

};
