import ReTable from './Table.vue';

export default {
  title: 'Re-UI/ReTable',
  component: ReTable,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReTable },
  template: '<re-Table v-bind="$props" >按鈕</re-Table>',
});

export const Primary = Template.bind({});
Primary.args = {

};
