<template>
  <div class="re-rich-text-editor">
    <div class="quill-editor" ref="quillEditor"></div>
  </div>
</template>

<script>
import Quill from 'quill';

// const editor = new Quill('#editor', options);
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { deltaToMarkdown } from 'quill-delta-to-markdown';

export default {
  name: 'ReRichTextEditor',
  props: {
    value: {
      type: String,
      default: '',
    },
    getHtml: {
      type: Boolean,
      default: false,
    },
    getMarkdown: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      // quillContainer: '.quill-editor',
      quillEditor: null,
      options: {
        modules: {
          toolbar: [[{ header: [1, 2, 3, 4, false] }], ['bold', 'italic', 'underline']],
        },
        theme: 'snow',
        formats: ['bold', 'underline', 'header', 'italic'],
      },
    };
  },
  methods: {
    handleChange() {
      if (this.getHtml) {
        this.handleToHtml();
      }

      if (this.getMarkdown) {
        this.handleToMarkdown();
      }
    },
    handleToHtml() {
      const cfg = {};
      const ctx = this.quillEditor.getContents().ops;
      const converter = new QuillDeltaToHtmlConverter(ctx, cfg);
      const html = converter.convert();
      this.$emit('getHtml', html);
    },
    handleToMarkdown() {
      const ctx = this.quillEditor.getContents().ops;
      const md = deltaToMarkdown(ctx);
      this.$emit('getMarkdown', md);
    },
    init() {
      this.quillEditor = new Quill(this.$refs.quillEditor, this.options);
      this.quillEditor.root.innerHTML = this.value;
      this.quillEditor.on('text-change', () => this.handleChange());
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scoped></style>
