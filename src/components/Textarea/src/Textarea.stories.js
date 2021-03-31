import ReTextarea from './Textarea.vue';

export default {
  title: 'Re-UI/ReTextarea',
  component: ReTextarea,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReTextarea },
  template: '<re-Textarea v-bind="$props" >按鈕</re-Textarea>',
});

export const Primary = Template.bind({});
Primary.args = {

};
