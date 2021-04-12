import ReRichTextEditor from './RichTextEditor.vue';

export default {
  title: 'Re-UI/ReRichTextEditor',
  component: ReRichTextEditor,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReRichTextEditor },
  template: '<re-RichTextEditor v-bind="$props" >按鈕</re-RichTextEditor>',
});

export const Primary = Template.bind({});
Primary.args = {

};
