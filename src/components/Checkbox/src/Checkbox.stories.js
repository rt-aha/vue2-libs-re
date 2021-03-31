import ReCheckbox from './CheckboxGroup.vue';

export default {
  title: 'Re-UI/ReCheckbox',
  component: ReCheckbox,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReCheckbox },
  template: '<re-Checkbox v-bind="$props" >按鈕</re-Checkbox>',
});

export const Primary = Template.bind({});
Primary.args = {

};
