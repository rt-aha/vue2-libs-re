<template>
  <div class="page-timeline">
    Timeline 施工中 ...
    <re-timeline :timelineData="timelineData" />
  </div>
</template>

<script>
export default {
  name: 'PageTimeline',
  data() {
    return {
      timelineData: [
        {
          title: '標題一',
          desc: '敘述一',
        },
        {
          title: '標題二',
          desc: '敘述二',
        },
        {
          title: '標題三',
          desc: '敘述三',
          render: () => ({
            render(h) {
              return h('div', [h('p', '我是自定義內容'), h('p', { style: { 'margin-top': '5px' } }, '我是自定義內容')]);
            },
          }),
        },
        {
          title: '標題四',
          desc: '敘述四',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
