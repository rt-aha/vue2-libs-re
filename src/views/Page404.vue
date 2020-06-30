<template>
  <div class="page404-view">
    <CenterBox>
      <div class="content">
        <h2 class="content__title">Oops! Page 404 ...</h2>
        <p class="content__desc">Can't Find the Page !</p>
        <router-link
          tag="button"
          class="home-link"
          to="/"
        >Home</router-link>
      </div>
    </CenterBox>
  </div>
</template>

<script>
import CenterBox from '@/components/global/CenterBox.vue';

export default {
  components: {
    CenterBox,
  },
};
</script>

<style scoped lang="scss">
.content {
  text-align: center;

  &__title {
    margin-bottom: 10px;
  }

  &__desc {
    margin-bottom: 30px;
  }
}

.home-link {
  display: inline-block;
  background-color: $c-main1;
  color: $c-white;
  box-sizing: border-box;
  padding: 10px 20px;
  border-radius: 4px;
  transition: 0.4s;

  &:hover {
    background-color: $c-assist2;
  }
}
</style>
