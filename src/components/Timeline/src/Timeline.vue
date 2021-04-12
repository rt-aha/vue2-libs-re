<template>
  <div class="re-timeline">
    <div class="re-timeline-wrapper">
      <re-timeline-block
        v-for="item of timelineData"
        :key="item.title"
        :data="item"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReTimeline',
  props: {
    timelineData: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
