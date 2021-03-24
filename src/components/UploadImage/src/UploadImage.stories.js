import ReUploadImage from './UploadImage.vue';

export default {
  title: 'Re-UI/ReUploadImage',
  component: ReUploadImage,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReUploadImage },
  template: '<re-UploadImage v-bind="$props" >按鈕</re-UploadImage>',
});

export const Primary = Template.bind({});
Primary.args = {

};
