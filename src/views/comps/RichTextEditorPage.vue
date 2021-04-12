<template>
  <div class="view-rich-text-editor">

      <re-rich-text-editor v-model="editorValue"/>

  </div>
</template>

<script>
export default {
  name: 'RichTextEditorPage',
  data() {
    return {
      editorValue: 'allalls',
    };
  },
};
</script>

<style lang="scss">
.view-rich-text-editor {
  @include box-padding(10px)
}
</style>
