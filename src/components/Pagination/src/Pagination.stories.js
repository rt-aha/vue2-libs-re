import RePagination from './Pagination.vue';

export default {
  title: 'Re-UI/RePagination',
  component: RePagination,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { RePagination },
  template: '<re-Pagination v-bind="$props" >按鈕</re-Pagination>',
});

export const Primary = Template.bind({});
Primary.args = {

};
