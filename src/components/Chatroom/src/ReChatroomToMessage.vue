<template>
  <div class="re-chatroom-to-message">
    <div class="to-message">
      <div class="to-message__info">
        <span class="to-message__info__is-read">
          {{ $attrs.isRead ? '已讀' : '' }}
        </span>
        <span class="to-message__info__time">
          {{ $attrs.time }}
        </span>
      </div>

      <div class="to-message__message-box">
        {{ $attrs.message }}
      </div>

      <div class="to-message__avatar">
        <div class="to-message__avatar__img"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReChatroomToMessage',
};
</script>

<style lang="scss" scoped>
.re-chatroom-to-message {
  width: 100%;
  @include flex(flex-end);
}

.to-message {
  @include flex();
  min-height: 30px;
  height: 100%;

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
    height: 26px;
    @include flex(space-between, flex-start, column);

    &__is-read {
      @include font-style($c-assist, 12px);
    }

    &__time {
      @include font-style($c-assist, 12px);
    }
  }
}
</style>
