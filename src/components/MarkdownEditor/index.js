import ReMarkdownEditor from './src/MarkdownEditor.vue';

/* istanbul ignore next */
ReMarkdownEditor.install = (Vue) => {
  Vue.component(ReMarkdownEditor.name, ReMarkdownEditor);
};

export default ReMarkdownEditor;
