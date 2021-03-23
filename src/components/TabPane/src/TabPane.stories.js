import ReTabPane from './TabPane.vue';

export default {
  title: 'Re-UI/ReTabPane',
  component: ReTabPane,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReTabPane },
  template: '<re-TabPane v-bind="$props" >按鈕</re-TabPane>',
});

export const Primary = Template.bind({});
Primary.args = {

};
