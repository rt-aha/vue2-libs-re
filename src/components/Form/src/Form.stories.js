import ReForm from './Form.vue';

export default {
  title: 'Re-UI/ReForm',
  component: ReForm,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReForm },
  template: '<re-Form v-bind="$props" >按鈕</re-Form>',
});

export const Primary = Template.bind({});
Primary.args = {

};
