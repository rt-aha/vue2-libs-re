<template>
  <div>
    <label>{{ $attrs.label }}</label>
    <span>{{ infos.haha }}</span>
    <slot :infos="infos"></slot>
  </div>
</template>

<script>
export default {
  name: 'TpltInputWrapper',
  data() {
    return {
      a: '1',
      b: '2',
      c: '3',
    };
  },
  props: {
    infos: Object,
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/index';
</style>
