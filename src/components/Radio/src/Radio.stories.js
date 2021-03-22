import ReRadio from './Radio.vue';

export default {
  title: 'Re-UI/ReRadio',
  component: ReRadio,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReRadio },
  template: '<re-Radio v-bind="$props" >按鈕</re-Radio>',
});

export const Primary = Template.bind({});
Primary.args = {

};
