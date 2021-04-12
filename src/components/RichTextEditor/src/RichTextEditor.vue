<template>
  <div class="re-rich-text-editor">
    <div class="quill-editor" ref="quillEditor"></div>
  </div>
</template>

<script>
import Quill from 'quill';

// const editor = new Quill('#editor', options);

export default {
  name: 'ReRichTextEditor',
  props: {
    value: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      // quillContainer: '.quill-editor',
      quillEditor: null,
      options: {
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, false] }],
            ['bold', 'italic', 'underline'],
          ],
        },
        theme: 'snow',
        formats: ['bold', 'underline', 'header', 'italic'],
      },
    };
  },
  methods: {
    init() {
      this.quillEditor = new Quill(this.$refs.quillEditor, this.options);

      this.quillEditor.root.innerHTML = this.value;

      this.quillEditor.on('text-change', () => this.update());
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss">
</style>
