<template>
  <div class="re-chatroom-from-message">
    <div class="from-message">
      <div class="from-message__avatar">
        <div class="from-message__avatar__img"></div>
      </div>
      <div class="from-message__message-box">
        {{ $attrs.message }}
      </div>
      <div class="from-message__info">
        <span class="from-message__info__time">
          {{ $attrs.time }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReChatroomFromMessage',
};
</script>

<style lang="scss" scoped>
.re-chatroom-from-message {
  width: 100%;
  @include flex();
}

.from-message {
  @include flex();

  &__avatar {
    flex: none;
    /* @include box-padding(5px); */

    &__img {
      @include circle(30px);
      background-color: #444;
    }
  }

  &__message-box {
    @include box-padding(8px);
    @include font-style($c-assist, 14px);
    @include flex();
    background-color: $c-white;
    border-radius: 4px;
    margin: 0 8px;
    min-height: 30px;
  }

  &__info {
    height: 100%;
    align-self: flex-end;

    &__time {
      @include flex(flex-end, center, column);

      @include font-style($c-assist, 12px);
    }
  }
}
</style>
