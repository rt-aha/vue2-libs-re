import ReUpload from './Upload.vue';

export default {
  title: 'Re-UI/ReUpload',
  component: ReUpload,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReUpload },
  template: '<re-Upload v-bind="$props" >按鈕</re-Upload>',
});

export const Primary = Template.bind({});
Primary.args = {

};
