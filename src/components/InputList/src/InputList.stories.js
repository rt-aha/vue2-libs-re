import ReInputList from './InputList.vue';

export default {
  title: 'Re-UI/ReInputList',
  component: ReInputList,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReInputList },
  template: '<re-InputList v-bind="$props" >按鈕</re-InputList>',
});

export const Primary = Template.bind({});
Primary.args = {

};
