<template>
  <div class="r-upload-video">

    <div class="image-upload-box">
      <input
      id="vidoeFile"
      type="file"
      class="video-input"
      @change="handleFileChange"
      @click="handleClick"
    />

      <label class="default-box" for="vidoeFile">
        <div class="default-content-cell">
          <div class="plus-box">
            <div class="plus-box__icon"></div>
          </div>
          <p class="label-cell">上傳影片</p>
        </div>
      </label>
    </div>

    <div class="image-preview-box-wrapper" v-if="preview.use">
      <video-preview-box
        v-for="(attachment, index) of attachments"
        :key="attachment.name + index"
        :attachment="attachment"
        :preview="preview"
        @removeFile="removeFile"
      />
    </div>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid';

export default {
  name: 'ReUploadVideo',
  props: {
    // 允許上傳多個圖片
    multiple: {
      type: Boolean,
      default: true,
    },
    // 壓縮設定
    compress: {
      type: Object,
      default: () => ({
        use: true,
        limitWidth: 600,
        limitHeight: 600,
      }),
    },
    // 允許格式
    accept: {
      type: Array,
      default: () => ['mov', 'quicktime'],

      // ['jpg', 'jpeg', 'png', 'gif']
    },
    // 檔案大小限制，以kb計算，預設 1024kb = 1mb
    uploadSizeLimit: {
      type: Number,
      default: 1024,
    },
    // 上傳檔案個數限制
    uploadCountLimit: {
      type: Number,
      default: 5,
    },
    preview: {
      type: Object,
      default: () => ({
        use: true,
        image: true,
        name: true,
        size: true,
      }),
    },
  },
  data() {
    return {

      attachments: [],
      videoFiles: [],
      acceptExt: [],
    };
  },
  created() {

  },

  methods: {
    handleClick(e) {
      e.target.value = null;
    },
    updateFiles(video, fileName, fileSize) {
      const name = this.preview.name ? fileName : '';
      const size = this.preview.size ? `${(fileSize / 1024).toFixed(2)}Kb` : '';
      this.attachments.push({
        id: uuid(),
        video,
        name,
        size,
      });
    },
    removeFile(id) {
      this.attachments = this.attachments.filter((ele) => ele.id !== id);
    },
    handleFileChange(event) {
      console.log('video!');
      this.videoFiles = event.target.files;

      const self = this;

      // 僅能上傳一張時，判斷是否已上傳
      if (this.isAllowedUpdate('single')) {
        console.error('檔案上傳限制1張');
        return;
      }

      // // 可上傳多張時，判斷是否是否已達上傳個數限制
      if (this.isAllowedUpdate('multiple')) {
        console.error(`檔案上傳限制${this.uploadCountLimit}張`);
        return;
      }

      // 驗證副檔名是否正確
      if (this.isAllowedUpdate('ext')) {
        console.error('不支援该格式，请确认');
        return;
      }

      // 驗證檔案大小是否過大
      if (this.isAllowedUpdate('size')) {
        console.error(`請勿上傳超過${this.uploadSizeLimit}Kb的檔案`);
        return;
      }

      this.videoFiles.forEach((ele) => {
        self.updateFiles(ele, ele.name, ele.size);
      });
    },
    isAllowedUpdate(type) {
      if (type === 'single') {
        return !this.multiple && this.attachments.length === 1;
      }

      if (type === 'multiple') {
        if (this.multiple && (this.videoFiles.length > this.uploadCountLimit)) {
          return true;
        }

        if (this.multiple && (this.videoFiles.length + this.attachments.length) > this.uploadCountLimit) {
          return true;
        }
      }

      if (type === 'ext') {
        for (const file of this.videoFiles) {
          const fileType = file.type.split('/')[1];
          if (!this.accept.includes(fileType)) {
            return true;
          }
        }
      }

      if (type === 'size') {
        for (const file of this.videoFiles) {
          const fileKbSize = Math.ceil(file.size / 1024);

          if (fileKbSize > this.uploadSizeLimit) {
            return true;
          }
        }
      }

      return false;
    },

  },
};
</script>

<style lang="scss" scoped>
.upload-desc {
  font-size: 12px;
  color: $c-black;
  margin-bottom: 5px;
}

.video-box {
  width: 100px;
  height: 100px;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  display: inline-block;
  margin-right: 10px;
  margin-top: 10px;
}

.vidoe-cover {
  width: 100%;
  height: 100%;
  background-color: rgba($c-black, 0.5);
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 100;
}

.video-img {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.cancel-video {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 120;
}

.progress-bar {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 92px;
  height: 3px;
  border-radius: 1.5px;
  background-color: rgba($c-black, 0.3);
  z-index: 120;
}

.ing-persent {
  background-color: $c-main;
  border-radius: 1.5px;
  height: 3px;
  width: 30%;
}

.re-upload {
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 36px;
  background-color: rgba($c-black, 0.5);
  z-index: 120;
  display: flex;
  justify-content: center;
  align-items: center;

  &__box {
  }

  &__icon {
    display: inline-block;
    vertical-align: middle;
    color: $c-white;
  }

  &__text {
    display: inline-block;
    vertical-align: middle;
    color: $c-white;
    font-size: 12px;
  }
}

.default-box {
  width: 100px;
  height: 100px;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  display: inline-block;
  justify-content: center;
  align-items: center;
  background-color: #f3f3f3;
  margin-right: 10px;
  margin-top: 10px;
}

.default-content-cell {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  overflow: hidden;
  text-align: center;
  width: 80px;
  @include font-style($c-assist, 14px);
}

.plus-box {
  text-align: center;

  &__icon {
    display: inline-block;
    position: relative;
    width: 40px;
    height: 40px;

    &::before {
      content: "";
      width: 20px;
      height: 2px;
      border-radius: 1px;
      background-color: $c-assist;
      display: inline-block;
      @include position(center);
    }

    &::after {
      content: "";
      width: 2px;
      height: 20px;
      border-radius: 1px;
      background-color: $c-assist;
      display: inline-block;
      @include position(center);
    }
  }
}

.img-cell {
}

.video-input {
  display: none;
}

.label-cell {
  font-size: 14px;
  text-align: center;
}

.photo-box {
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 6px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.error-wrapper {
  width: 100%;
  height: 16px;
  line-height: 16px;
  &__text {
    font-size: 12px;
    color: #f00;
  }
}

.image-preview-box-wrapper {
  width: 500px;
  margin-top: 10px;
}
</style>
