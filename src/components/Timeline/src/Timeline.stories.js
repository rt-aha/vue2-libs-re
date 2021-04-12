import ReTimeline from './Timeline.vue';

export default {
  title: 'Re-UI/ReTimeline',
  component: ReTimeline,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReTimeline },
  template: '<re-Timeline v-bind="$props" >按鈕</re-Timeline>',
});

export const Primary = Template.bind({});
Primary.args = {

};
