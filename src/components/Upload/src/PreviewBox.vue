<template>
  <div class="r-preview-box">
    <div class="r-preview-box__content">
      <div
        class="r-preview-box__content__photo"
        :style="`background-image: url(${snapImage || attachment.file });`"
      />
        <!-- v-if="$attrs.preview.image" -->
      <p class="r-preview-box__content__info">
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

    <div class="r-preview-box__action">
      <span class="r-preview-box__action__delete" @click="removeFile">刪除</span>
    </div>
  </div>

</template>

<script>
export default {
  name: 'RePreviewBox',
  props: {
    attachment: {
      type: Object,
      default: () => ({
        file: '',
        name: '',
        size: '',
        id: '',
        type: 'image', // image, video, other
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
    getVideoDuration() {
      const timeLength = this.$refs.invisibleVideo.duration;

      // 處理時間時間長度
      const duration = {
        hour: 0,
        min: 0,
        sec: 0,
      };

      // 處理時間格式
      duration.hour = (timeLength / 3600).toFixed(0);
      duration.min = (timeLength / 60).toFixed(0);
      duration.sec = (timeLength % 60).toFixed(0);
      duration.hour = Number(duration.hour) < 10 ? `0${duration.hour}` : duration.hour;
      duration.min = Number(duration.min) < 10 ? `0${duration.min}` : duration.min;
      duration.sec = Number(duration.sec) < 10 ? `0${duration.sec}` : duration.sec;
      const durationText = `${duration.hour}:${duration.min}:${duration.sec}`;

      this.videoDuration = durationText;
      // this.emitFileInfo();
    },

    handlePreview() {
      if (!this.attachment.file) {
        return;
      }

      this.$refs.videoSource.src = URL.createObjectURL(this.attachment.file);

      this.$refs.invisibleVideo.load();
      // this.attachment.videos.forEach() {}
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const blob = new Blob([fileReader.result], { type: this.attachment.file.type });

        const videoTempUrl = URL.createObjectURL(blob);

        const video = document.createElement('video');

        const snapImage = () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
          const image = canvas.toDataURL();

          this.snapImage = image;

          canvas.toBlob(async (blobFile) => {
            const formData = new FormData();
            formData.append('file', blobFile, 'image.png');
          }, 'image/png');

          const success = image.length > 100000;
          if (success) {
            URL.revokeObjectURL(videoTempUrl);
          }

          return success;
        };

        const timeupdate = () => {
          if (snapImage()) {
            video.removeEventListener('timeupdate', timeupdate);
            video.pause();
          }
        };
        video.addEventListener('loadeddata', () => {
          if (snapImage()) {
            video.removeEventListener('timeupdate', timeupdate);
          }
        });

        video.addEventListener('timeupdate', timeupdate);
        video.preload = 'metadata';
        video.src = videoTempUrl;
        // Load video in Safari / IE11
        video.muted = true;
        video.playsInline = true;
        video.play();
      };

      fileReader.readAsArrayBuffer(this.attachment.file);
    },

  },
  mounted() {
    // console.log('mounted ...');

    console.log('this.attachment', this.attachment);

    if (this.attachment.type === 'video') {
      this.handlePreview();
    }
  },
};
</script>

<style lang="scss" scoped>
.r-preview-box {
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
.temp {
  width: 300px;
  height: 300px;
}
</style>
