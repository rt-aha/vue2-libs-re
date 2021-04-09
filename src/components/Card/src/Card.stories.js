import ReCard from './Card.vue';

export default {
  title: 'Re-UI/ReCard',
  component: ReCard,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReCard },
  template: '<re-Card v-bind="$props" >按鈕</re-Card>',
});

export const Primary = Template.bind({});
Primary.args = {

};
