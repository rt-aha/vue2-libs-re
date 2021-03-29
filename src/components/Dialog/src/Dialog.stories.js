import ReDialog from './Dialog.vue';

export default {
  title: 'Re-UI/ReDialog',
  component: ReDialog,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReDialog },
  template: '<re-Dialog v-bind="$props" >按鈕</re-Dialog>',
});

export const Primary = Template.bind({});
Primary.args = {

};
