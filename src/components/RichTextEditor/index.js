import ReRichTextEditor from './src/RichTextEditor.vue';

/* istanbul ignore next */
ReRichTextEditor.install = (Vue) => {
  Vue.component(ReRichTextEditor.name, ReRichTextEditor);
};

export default ReRichTextEditor;
