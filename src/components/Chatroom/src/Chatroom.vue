<template>
  <div class="re-chatroom">
    <div class="chatroom">
      <div class="chatroom__contact">
        <div class="chatroom__contact__header">
          <re-input placeholder="搜尋 ..." />
        </div>
        <div class="chatroom__contact__list">
          <ul class="contact">
            <re-chatroom-contact-item
              v-for="contact of contactList"
              :key="contact.id"
              :contact="contact"
            />
          </ul>
        </div>
        <div class="chatroom__contact__footer">footer</div>
      </div>
      <div class="chatroom__content">
        <div class="chatroom__content__info-tool">
          <div class="content__info-tool">
            <div class="content__info-tool__info">
              <p class="content__info-tool__info__name">Rosemary</p>
            </div>
            <div class="content__info-tool__tool">
              <ul class="content__info-tool__tool__list">
                <li class="content__info-tool__tool__list__item">t1</li>
                <li class="content__info-tool__tool__list__item">t2</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="chatroom__content__message">
          <div class="content__message">
            <div class="content__message__row" v-for="message of messageList" :key="message.id">
              <component :is="message.type === 'from' ? 're-chatroom-from-message' : 're-chatroom-to-message'" v-bind="message" />
            </div>
          </div>
        </div>
        <div class="chatroom__content__textarea">
          <div class="content__textarea">
            <div class="content__textarea__feature">
              <ul class="content__textarea__feature__list">
                <li class="content__textarea__feature__list__item">f1</li>
                <li class="content__textarea__feature__list__item">f2</li>
              </ul>
            </div>
            <div class="content__textarea__box">
              <textarea class="content__textarea__box__input" />
            </div>
            <div class="content__textarea__btn-box">
              <re-button type="plain">傳送</re-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReChatroomContactItem from './ReChatroomContactItem.vue';

export default {
  components: { ReChatroomContactItem },
  name: 'ReChatroom',
  data() {
    return {
      contactList: [
        {
          name: 'Rosemary',
          id: 1,
          time: '11:38',
          message: '午餐吃什麼',
          notice: 0,
        },
        {
          name: 'Kevin',
          id: 2,
          time: '10:09',
          message: '晚上和同事有約',
          notice: 1,
        },
        {
          name: 'Ivy',
          id: 3,
          time: '昨天 19:01',
          message: '假日會回來嗎？什麼時候',
          notice: 3,
        },
      ],
      messageList: [
        {
          type: 'from',
          message: '一些訊息',
          time: '10:09',
          id: 1,
        },
        {
          type: 'from',
          message: '一些訊息',
          time: '10:09',
          id: 2,
        },
        {
          type: 'to',
          message: '一些訊息',
          time: '10:09',
          isRead: true,
          id: 3,
        },
        {
          type: 'from',
          message: '一些訊息',
          time: '10:09',
          id: 4,
        },
        {
          type: 'to',
          message: '一些訊息',
          time: '10:09',
          isRead: false,
          id: 5,
        },
      ],
    };
  },

};
</script>

<style lang="scss">
.re-chatroom {
  width: 100%;
  height: 100%;
}

.chatroom {
  width: 100%;
  height: 100%;
  @include flex();

  &__contact {
    flex: none;
    width: 220px;
    height: 100%;
    background-color: #ccc;
    @include flex(flex-start, flex-start, column);

    &__header {
      @include flex(center, center, column);
      @include box-padding(10px);
      background-color: #bbb;
      flex: none;
      height: auto;
      width: 100%;
      height: 60px;
    }

    &__list {
      width: 100%;
      flex: 1;
    }

    &__footer {
      flex: none;
      height: auto;
      @include box-padding(10px);
    }
  }

  &__content {
    flex: 1;
    height: 100%;
    background: #ddd;
    @include flex(flex-start, flex-start, column);

    &__info-tool {
      flex: none;
      height: auto;
      background-color: #ddd;
      width: 100%;
      @include box-padding(10px);
      border-bottom: 1px solid #ccc;
      height: 60px;
    }

    &__message {
      width: 100%;
      flex: 1;

    }

    &__textarea {
      border-top: 1px solid #ccc;
      flex: none;
      height: auto;
      @include box-padding(10px);
      width: 100%;
    }
  }
}

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

.conatact-info {
  width: 100%;
  @include flex(space-between);

  &__name {
    @include font-style($c-assist, 12px);
  }

  &__time {
    @include font-style($c-lightgrey, 12px);
  }
}

.conatact-message {
  width: 100%;
  @include flex(space-between);

  &__message {
    width: 100%;
    @include font-style($c-assist, 12px);
  }

  &__notice {
    @include font-style($c-assist, 12px);
  }
}

.notice-box {
  height: 20px;
  min-width: 20px;
  background-color: $c-main;
  border-radius: 10px;

  &__value-cell {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    @include box-padding(5px);

    &__value {
      display: inline-block;
      @include font-style($c-white, 12px);
    }
  }
}

.content {
  width: 100%;
  &__info-tool {
    width: 100%;
    @include flex(space-between);

    &__info {
      &__name {
        @include font-style($c-assist, 16px);
      }
    }

    &__tool {
      &__list {
        &__item {
          @include box-padding(10px);
          display: inline-block;
          @include font-style($c-assist, 14px);
        }
      }
    }
  }

  &__message {
    @include box-padding(10px);
    flex: 1;
    height: 100%;
    width: 100%;

    &__row {
        @include box-padding(5px 0);
      }
  }

  &__textarea {
    width: 100%;
    @include flex();

    &__feature {
      width: auto;
      flex: none;
      &__list {
        &__item {
          margin-right: 10px;
          display: inline-block;
          @include font-style($c-assist, 14px);
        }
      }
    }

    &__box {
      flex: 1;
      width: 100%;
      position: relative;

      &__input {
        width: 100%;
        resize: none;
        border: 0px;
        border-radius: 4px;
        @include box-padding(10px);
        outline: 0px transparent;
        /* height: 38px; */
        /* margin-left: 10px; */
      }
    }

    &__btn-box {
      flex: none;
      width: auto;
    }
  }
}
</style>
