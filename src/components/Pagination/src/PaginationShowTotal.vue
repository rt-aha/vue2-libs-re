<template>
  <div clas="re-pagination-show-total">
   <span>{{totalInfo.preText || '總共'}}</span>
   <span>{{totalInfo.total || totalInfo}}</span>
   <span>{{totalInfo.suffText || '筆'}}</span>
  </div>
</template>

<script>
export default {
  name: 'RePaginationShowTotal',
  props: {
    totalInfo: {
      type: [Object, String, Number],
      default: () => ({
        total: '',
      }),
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
