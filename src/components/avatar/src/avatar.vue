<template>
  <div class="re-avatar">
    <div
      v-if="avatarType === 'src'"
      class="re-avatar__bg-img"
      :style="{ 'background-image': `url(${src})`, width: wh, height: wh }"
    ></div>

    <div v-if="avatarType === 'name'" class="re-avatar__bg-name" :style="{ width: wh, height: wh }">
      <p class="re-avatar__bg-name__text">{{ name | firstLetter }}</p>
    </div>

    <img v-if="avatarType === 'default'" src="@/assets/avatar.png" :style="{ width: wh, height: wh }" />
  </div>
</template>

<script>
export default {
  name: 'ReAvatar',
  props: {
    size: {
      type: String,
      validator: (val) => ['small', 'default', 'large', 'custom'].includes(val),
      default: 'default',
    },
    src: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    customSize: {
      type: String,
      default: '',
    },
  },
  filters: {
    firstLetter(val) {
      return val.substr(0, 1);
    },
  },
  computed: {
    avatarType() {
      if (this.src) {
        return 'src';
      }

      if (this.name) {
        return 'name';
      }

      return 'default';
    },
    wh() {
      if (this.customSize) {
        return this.customSize;
      }

      switch (this.size) {
        case 'small':
          return '40px';
        case 'defualt':
          return '50px';
        case 'large':
          return '60px';
        default:
          return '50px';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.re-avatar {
  &__bg-img {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  &__bg-name {
    position: relative;
    background-color: #ccc;
    border-radius: 50%;

    &__text {
      @include position(center);
    }
  }
}
</style>
