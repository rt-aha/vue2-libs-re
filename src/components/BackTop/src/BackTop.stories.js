import ReBackTop from './BackTop.vue';

export default {
  title: 'Re-UI/ReBackTop',
  component: ReBackTop,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReBackTop },
  template: '<re-BackTop v-bind="$props" >按鈕</re-BackTop>',
});

export const Primary = Template.bind({});
Primary.args = {

};
