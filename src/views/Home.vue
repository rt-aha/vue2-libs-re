<template>
  <div class="home">
    <check-list />
    <div class="btn-wrapper"  v-for="item of btns" :key="item">
      <button class="btn" @click="toDevComp(item)">Develop {{item}}</button>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import CheckList from '@/components/CheckList.vue';

export default {
  name: 'Home',
  components: {
    CheckList,
  },
  data() {
    return {
      btns: [
        'general', 'form', 'table', 'test', 'render',
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

<style lang="scss">
.btn-wrapper {
  margin-top: 10px;

  .btn + .btn {
    margin-left: 10px;
  }
}
</style>
