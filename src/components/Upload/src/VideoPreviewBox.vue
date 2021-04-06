<template>
  <div class="r-image-preview-box">
    <div class="r-image-preview-box__content">
      <div
        class="r-image-preview-box__content__photo"
        :style="`background-image: url(${snapImage});`"
        v-if="$attrs.preview.image"
      />
      <p class="r-image-preview-box__content__info">
        <span v-if="$attrs.preview.name">{{ attachment.name }}</span>
        <span v-if="$attrs.preview.size">({{ attachment.size }})</span>
      </p>
    </div>

    <video
      ref="invisibleVideo"
      class="invisible-video"
      width="320"
      height="150"
      controls="controls"
      @loadedmetadata="getVideoDuration"
    >
      <source ref="videoSource" />
    </video>

    <div class="r-image-preview-box__action">

      <span class="r-image-preview-box__action__delete" @click="removeFile"
        >刪除</span
      >
    </div>
  </div>
</template>

<script>

export default {
  name: 'ReVideoPreviewBox',

  props: {
    attachment: {
      type: Object,
      default: () => ({
        image: '',
        name: '',
        size: '',
        id: '',
      }),
    },
  },
  data() {
    return {
      file: {},
      snapImage: '',
      modal: {
        previewVideo: {
          type: 'previewVideo',
          visible: false,
        },

      },
    };
  },
  // watch: {
  //   attachment: {
  //     deep: true,
  //     immediate: true,
  //     handler: 'handlePreview',
  //   },
  // },
  mounted() {
    // console.log('mounted ...');
    this.handlePreview();
  },
  methods: {
    closeModal(type) {
      this.modal[type].visible = false;
    },
    openModal(type) {
      this.modal[type].visible = true;
    },
    removeFile() {
      this.$emit('removeFile', this.attachment.id);
    },

  },
};
</script>

<style lang="scss" scoped>
.r-image-preview-box {
  @include flex();
  margin-top: 5px;

  &__content {
    flex: 1;
    @include flex();

    &__photo {
      width: 30px;
      height: 30px;
      overflow: hidden;
      display: inline-block;
      /* border-radius: 6px; */
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }

    &__info {
      display: inline-block;
      margin-left: 10px;
      @include font-style($c-assist, 14px);
    }
  }

  &__action {
    flex: none;
    width: 30px;
    &__delete {
      @include font-style($c-assist, 14px);
      cursor: pointer;
    }
  }
}

.invisible-video {
  display: none;
}
</style>
