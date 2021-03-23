import ReTabs from './Tabs.vue';

export default {
  title: 'Re-UI/ReTabs',
  component: ReTabs,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReTabs },
  template: '<re-Tabs v-bind="$props" >按鈕</re-Tabs>',
});

export const Primary = Template.bind({});
Primary.args = {

};
