import ReTree from './Tree.vue';

export default {
  title: 'Re-UI/ReTree',
  component: ReTree,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReTree },
  template: '<re-Tree v-bind="$props" >按鈕</re-Tree>',
});

export const Primary = Template.bind({});
Primary.args = {

};
