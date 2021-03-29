import ReBadge from './Badge.vue';

export default {
  title: 'Re-UI/ReBadge',
  component: ReBadge,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReBadge },
  template: '<re-Badge v-bind="$props" >按鈕</re-Badge>',
});

export const Primary = Template.bind({});
Primary.args = {

};
