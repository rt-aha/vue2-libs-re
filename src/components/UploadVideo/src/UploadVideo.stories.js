import ReUploadVideo from './UploadVideo.vue';

export default {
  title: 'Re-UI/ReUploadVideo',
  component: ReUploadVideo,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReUploadVideo },
  template: '<re-UploadVideo v-bind="$props" >按鈕</re-UploadVideo>',
});

export const Primary = Template.bind({});
Primary.args = {

};
