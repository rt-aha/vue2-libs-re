import ReTag from './Tag.vue';

export default {
  title: 'Re-UI/ReTag',
  component: ReTag,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReTag },
  template: '<re-Tag v-bind="$props" >按鈕</re-Tag>',
});

export const Primary = Template.bind({});
Primary.args = {

};
