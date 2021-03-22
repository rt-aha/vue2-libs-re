import ReSelect from './Select.vue';

export default {
  title: 'Re-UI/ReSelect',
  component: ReSelect,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReSelect },
  template: '<re-select v-bind="$props" >按鈕</re-select>',
});

export const Primary = Template.bind({});
Primary.args = {

};
