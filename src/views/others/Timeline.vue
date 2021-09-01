<template>
  <div class="page-timeline">
    <re-dev-sheet>
      <re-dev-desc>基本使用</re-dev-desc>
      <re-timeline :timelineData="timelineData"
    /></re-dev-sheet>

    <re-dev-sheet>
      <re-dev-desc>倒敘</re-dev-desc>
      <re-timeline :timelineData="timelineData" reverse />
    </re-dev-sheet>
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
