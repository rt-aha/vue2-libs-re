<template>
  <div class="home">
    <check-list />
    <re-title>頁面</re-title>
    <div class="btn-wrapper" v-for="item of btns" :key="item">
      <re-button class="btn" @click="toDevComp(item)">Develop {{ item }}</re-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CheckList from '@/components/CheckList.vue';

export default {
  name: 'Dashbaord',
  components: {
    CheckList,
  },
  data() {
    return {
      btns: [
        'general',
        'form',
        'table',
        'test',
        'render',
        'accounList',
        'carouselPage',
        'accordionPage',
        'richtexteditorPage',
        'chatroomPage',
      ],
    };
  },
  methods: {
    toDevComp(name) {
      this.$router.push({ name });
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-wrapper {
  margin-top: 10px;

  .btn + .btn {
    margin-left: 10px;
  }
}
</style>
