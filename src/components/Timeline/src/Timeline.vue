<template>
  <div class="re-timeline">
    <div class="re-timeline-wrapper">
      <re-timeline-block v-for="item of innerTimelineData" :key="item.title" :data="item" />
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';

export default {
  name: 'ReTimeline',
  props: {
    timelineData: {
      type: Array,
      default: () => [],
    },
    reverse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    innerTimelineData() {
      if (this.reverse) {
        return cloneDeep(this.timelineData).reverse();
      }

      return cloneDeep(this.timelineData);
    },
  },
};
</script>
