<template>
  <div class="page-rich-text-editor">
    <re-rich-text-editor
      v-model="editorValue"
      :getHtml="false"
      :getMarkdown="false"
      @getHtml="getHtml"
      @getMarkdown="getMarkdown"
    />
  </div>
</template>

<script>
export default {
  name: 'PageRichTextEditor',
  data() {
    return {
      editorValue: 'test text',
    };
  },
  methods: {
    getHtml(html) {
      console.log('html...', html);
    },
    getMarkdown(md) {
      console.log('md...', md);
    },
  },
};
</script>

<style lang="scss" scoped>
.view-rich-text-editor {
  @include box-padding(10px);
}
</style>
