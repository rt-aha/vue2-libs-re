import ReInput from './Input.vue';

export default {
  title: 'Re-UI/ReInput',
  component: ReInput,
  argTypes: {
    size: { control: { type: 'select', options: ['small', 'default', 'large'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReInput },
  template: '<re-input v-bind="$props">按鈕</re-input>',
});

export const Primary = Template.bind({});
Primary.args = {
  value: '',
  disabled: true,
};
