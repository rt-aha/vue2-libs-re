import ReTooltip from './Tooltip.vue';

export default {
  title: 'Re-UI/ReTooltip',
  component: ReTooltip,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReTooltip },
  template: '<re-Tooltip v-bind="$props" >按鈕</re-Tooltip>',
});

export const Primary = Template.bind({});
Primary.args = {

};
