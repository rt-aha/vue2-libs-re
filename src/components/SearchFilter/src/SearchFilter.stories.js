import ReSearchFilter from './SearchFilter.vue';

export default {
  title: 'Re-UI/ReSearchFilter',
  component: ReSearchFilter,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReSearchFilter },
  template: '<re-SearchFilter v-bind="$props" >按鈕</re-SearchFilter>',
});

export const Primary = Template.bind({});
Primary.args = {

};
