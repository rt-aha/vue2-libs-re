<template>
  <div>
    <CenterBox>
      <div class="content-wrapper">
        <h2 class="title-404">Oops! Page 404 ...</h2>
        <p class="not-find-text"> Can't Find the Page !</p>
        <router-link tag="button"
                     class="home-link"
                     to="/">Home</router-link>
      </div>
    </CenterBox>
  </div>
</template>

<script lang="ts">
import CenterBox from '@/components/global/CenterBox.vue';

export default {
  components: {
    CenterBox,
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/index';

.content-wrapper {
  text-align: center;
}

.title-404 {
  margin-bottom: 10px;
}

.not-find-text {
  margin-bottom: 30px;
}

.home-link {
  display: inline-block;
  background-color: $c-assist1;
  color: $c-white;
  box-sizing: border-box;
  padding: 10px 20px;
  border-radius: 4px;

  &:hover {
    background-color: $c-assist2;
  }
}
</style>