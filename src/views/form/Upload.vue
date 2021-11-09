<template>
  <div class="page-upload">
    <re-dev-sheet>
      <re-dev-desc>基本使用</re-dev-desc>
      <re-upload v-model="fileList1">
        <re-button>
          <!-- <div class="btn-wrap"> -->
          <!-- <img class="btn-wrap__icon" src="@/assets/icon/upload.svg" /> -->
          <span class="btn-wrap__upload">上傳</span>
          <!-- </div> -->
        </re-button>
      </re-upload>
    </re-dev-sheet>

    <re-dev-sheet>
      <re-dev-desc>僅能上傳一張</re-dev-desc>
      <re-upload v-model="fileList2" @handleMessage="handleMessage2" :multiple="false">
        <re-button :disabled="isDisabled2">
          <!-- <div class="btn-wrap"> -->
          <!-- <img class="btn-wrap__icon" src="@/assets/icon/upload.svg" /> -->
          <span class="btn-wrap__upload">上傳</span>
          <!-- </div> -->
        </re-button>
      </re-upload>
    </re-dev-sheet>

    <re-dev-sheet>
      <re-dev-desc>限制上傳大小</re-dev-desc>
      <re-upload v-model="fileList3" @handleMessage="handleMessage3" :uploadSizeLimit="10">
        <re-button :disabled="isDisabled3">
          <!-- <div class="btn-wrap"> -->
          <!-- <img class="btn-wrap__icon" src="@/assets/icon/upload.svg" /> -->
          <span class="btn-wrap__upload">上傳</span>
          <!-- </div> -->
        </re-button>
      </re-upload>
    </re-dev-sheet>
  </div>
</template>

<script>
export default {
  name: 'PageUpload',
  data() {
    return {
      fileList1: [
        {
          id: '111',
          file: 'https://indigoichigo-storage.s3.us-west-1.amazonaws.com/layout-four-steps-02.jpg',
          name: 'test1',
          size: '-',
          type: 'iamge',
        },
        {
          id: '222',
          file: 'https://indigoichigo-storage.s3.us-west-1.amazonaws.com/layout-four-steps-03.jpg',
          name: 'test2',
          size: '-',
          type: 'iamge',
        },
      ],
      fileList2: [],
      fileList3: [],
      isDisabled2: false,
      isDisabled3: false,
    };
  },
  methods: {
    handleMessage2(message) {
      this.isDisabled2 = message.isDisabled;

      if (message.error) {
        console.log('demo2 message...', message.error);
      }
    },
    handleMessage3(message) {
      this.isDisabled3 = message.isDisabled;

      if (message.error) {
        console.log('demo3 message...', message.error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-wrap {
  @include flex();

  &__icon {
    width: 20px;
  }

  &__upload {
    @include font-style($c-white, 14px);
    display: inline-block;
    /* margin-left: 5px; */
  }
}
</style>
