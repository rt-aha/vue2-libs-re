import Reloading from './loading.vue';

export default {
  title: 'Re-UI/Reloading',
  component: Reloading,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Reloading },
  template: '<re-loading v-bind="$props" >按鈕</re-loading>',
});

export const Primary = Template.bind({});
Primary.args = {

};
