import ReEasyForm from './EasyForm.vue';

export default {
  title: 'Re-UI/ReEasyForm',
  component: ReEasyForm,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReEasyForm },
  template: '<re-EasyForm v-bind="$props" >按鈕</re-EasyForm>',
});

export const Primary = Template.bind({});
Primary.args = {

};
