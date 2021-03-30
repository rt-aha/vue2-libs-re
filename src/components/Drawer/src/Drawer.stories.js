import ReDrawer from './Drawer.vue';

export default {
  title: 'Re-UI/ReDrawer',
  component: ReDrawer,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReDrawer },
  template: '<re-Drawer v-bind="$props" >按鈕</re-Drawer>',
});

export const Primary = Template.bind({});
Primary.args = {

};
