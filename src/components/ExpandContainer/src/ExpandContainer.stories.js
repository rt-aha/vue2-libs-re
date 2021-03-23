import ReExpandContainer from './ExpandContainer.vue';

export default {
  title: 'Re-UI/ReExpandContainer',
  component: ReExpandContainer,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReExpandContainer },
  template: '<re-ExpandContainer v-bind="$props" >按鈕</re-ExpandContainer>',
});

export const Primary = Template.bind({});
Primary.args = {

};
