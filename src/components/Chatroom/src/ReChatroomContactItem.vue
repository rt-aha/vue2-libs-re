<template>
  <div class="re-chatroom-contact-item">
    <li class="contact__item">
      <div class="contact__item__avatar">
        <div class="contact__item__avatar__img"></div>
      </div>
      <div class="contact__item__message-info">
        <div class="conatact-info">
          <div class="conatact-info__name">{{ $attrs.contact.name }}</div>
          <div class="conatact-info__time">{{ $attrs.contact.time }}</div>
        </div>

        <div class="conatact-message">
          <div class="conatact-message__message">
            {{ $attrs.contact.message }}
          </div>
          <div class="conatact-message__notice" v-show="$attrs.contact.notice">
            <div class="notice-box">
              <div class="notice-box__value-cell">
                <span class="notice-box__value-cell__value">{{
                  $attrs.contact.notice
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  name: 'ReChatroomContactItem',
};
</script>

<style lang="scss" scoped>
.contact {
  width: 100%;

  &__item {
    width: 100%;
    @include flex();

    &__avatar {
      width: auto;
      flex: none;
      @include box-padding(10px);

      &__img {
        @include circle(40px);
        background-color: #aaa;
      }
    }

    &__message-info {
      @include flex(space-between, center, column);
      @include box-padding(10px);
      width: 100%;
      height: 60px;
      flex: 1;
    }
  }
}
</style>
