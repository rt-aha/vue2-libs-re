import ReFormItem from './FormItem.vue';

export default {
  title: 'Re-UI/ReFormItem',
  component: ReFormItem,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReFormItem },
  template: '<re-FormItem v-bind="$props" >按鈕</re-FormItem>',
});

export const Primary = Template.bind({});
Primary.args = {

};
