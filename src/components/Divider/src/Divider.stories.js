import ReDivider from './Divider.vue';

export default {
  title: 'Re-UI/ReDivider',
  component: ReDivider,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReDivider },
  template: '<re-Divider v-bind="$props" >按鈕</re-Divider>',
});

export const Primary = Template.bind({});
Primary.args = {

};
