<template>
  <div class="re-upload-file">
    <div class="upload-box">
      <input
        type="file"
        class="file-input"
        :ref="inputUuid"
        :multiple="multiple && 'multiple'"
        @change="handleFileChange"
        :disabled="isDisabled"
      />
      <!-- @click="handleClick" -->

      <!-- FIXED: 不知為何包了 re-button/button 無法生效-->

      <div class="trigger-scope" @click="handleClick">
        <slot>
          <re-button @click.prevent>
            <!-- <div class="btn-wrap"> -->
            <!-- <img class="btn-wrap__icon" src="@/assets/icon/upload.svg" /> -->
            <span class="btn-wrap__upload">上傳</span>
            <!-- </div> -->
          </re-button>
        </slot>
      </div>
    </div>

    <div class="preview-box-wrapper" v-if="preview.use">
      <re-preview-box
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
import triggerValidate from '@/mixins/triggerValidate';

export default {
  name: 'ReUpload',
  mixins: [triggerValidate],
  props: {
    value: {
      type: Array,
      default: () => [],
    },
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
        defaultExt: '', // 設定圖片壓縮格副檔名
      }),
    },
    // 允許格式
    accept: {
      type: Object,
      default: () => ({
        image: ['jpg', 'jpeg', 'png', 'gif'],
        video: ['mov', 'quicktime'],
      }),

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
        type: 'default', // default: 一行一行的圖片、圖片名稱、圖片大小
      }),
    },
  },
  data() {
    return {
      attachments: [],
      files: [],
      acceptExt: [],
      inputUuid: uuid(), // 避免同個頁面有兩個 re-upload 導致，id-for 關聯錯誤
    };
  },

  computed: {
    isDisabled() {
      if (!this.multiple) {
        if (this.attachments.length === 1) {
          return true;
        }
      }

      return false;
    },
  },
  methods: {
    init() {
      if (this.value.length !== 0) {
        this.attachments = this.value;
      }
    },
    isAllowedUpdate(type) {
      if (type === 'single') {
        return !this.multiple && this.attachments.length === 1;
      }

      if (type === 'multiple') {
        if (this.multiple && this.files.length > this.uploadCountLimit) {
          return true;
        }

        if (this.multiple && this.files.length + this.attachments.length > this.uploadCountLimit) {
          return true;
        }
      }

      if (type === 'ext') {
        // const acceptExt = ['gif'];
        const acceptList = [...this.accept.image, ...this.accept.video];
        for (const file of this.files) {
          const fileType = file.type.split('/')[1];
          if (!acceptList.includes(fileType)) {
            return true;
          }
        }
      }

      if (type === 'size') {
        for (const file of this.files) {
          const fileKbSize = Math.ceil(file.size / 1024);

          if (fileKbSize > this.uploadSizeLimit) {
            return true;
          }
        }
      }

      return false;
    },
    handleMessage(info) {
      const { code, errorMessage } = info;

      this.$emit('handleMessage', {
        isDisabled: this.isDisabled,
        error: {
          code,
          message: errorMessage,
        },
      });
    },
    updateValue() {
      this.$emit('input', this.attachments);
      this.triggerValidate('change', this.attachments);
      this.handleMessage({});
    },
    updateFiles(file, fileName, fileSize, fileType) {
      const name = this.preview.name ? fileName : '';
      const size = this.preview.size ? `${(fileSize / 1024).toFixed(2)}Kb` : '';

      this.attachments.push({
        id: uuid(),
        name,
        size,
        file,
        type: fileType,
      });
      this.updateValue();
    },
    removeFile(id) {
      this.attachments = this.attachments.filter((ele) => ele.id !== id);
      this.updateValue();
      this.handleMessage({});
    },
    handleClick(e) {
      this.$refs[this.inputUuid].value = null;
      this.$refs[this.inputUuid].click();
    },
    handleFileChange(event) {
      this.files = event.target.files;
      // 僅能上傳一張時，判斷是否已上傳
      if (this.isAllowedUpdate('single')) {
        const err = '檔案上傳限制1張';
        console.error(err);
        this.handleMessage({ code: 1, errorMessage: err });
        return;
      }

      // 可上傳多張時，判斷是否是否已達上傳個數限制
      if (this.isAllowedUpdate('multiple')) {
        const err = `檔案上傳限制${this.uploadCountLimit}張`;
        console.error(err);
        this.handleMessage({ code: 2, errorMessage: err });
        return;
      }

      // 驗證副檔名是否正確
      if (this.isAllowedUpdate('ext')) {
        const err = '不支援該格式，請確認';
        console.error(err);
        this.handleMessage({ code: 3, errorMessage: err });
        return;
      }

      // 驗證檔案大小是否過大
      if (this.isAllowedUpdate('size')) {
        const err = `請勿上傳超過${this.uploadSizeLimit}Kb的檔案`;
        console.error(err);
        this.handleMessage({ code: 4, errorMessage: err });
        return;
      }

      this.handlePreview();
    },
    handlePreview() {
      const self = this;

      this.files.forEach((file) => {
        const fileType = file.type.split('/')[1];

        if (this.accept.image.includes(fileType)) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (e) => {
            const { use: useCompress, limitWidth: w, limitHeight: h } = self.compress;
            const targetResult = e.target.result;

            if (useCompress) {
              self.compressFile(targetResult, w, h, file, self.updateFiles);
            } else {
              self.updateFiles(targetResult, file.name, file.size, 'image');
            }
          };
        }

        if (this.accept.video.includes(fileType)) {
          self.updateFiles(file, file.name, file.size, 'video');
        }
      });
    },

    compressFile(imgBase64Data, maxWidth, maxHeight, file, updateFiles) {
      // 建立一個圖片物件和Canvas
      const img = new Image();
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      // 圖片連結為
      img.src = imgBase64Data;
      // 讀取完圖片後
      img.onload = () => {
        // 圖片原始尺寸
        const originWidth = img.width;
        const originHeight = img.height;

        // 設定目標初始化尺寸
        let targetWidth = originWidth;
        let targetHeight = originHeight;

        // 若原始寬度大於最大寬度，或原始高度大於最大高度
        if (originWidth > maxWidth || originHeight > maxHeight) {
          // 且原始寬高比大於最大寬高比
          if (originWidth / originHeight > maxWidth / maxHeight) {
            // 如上傳圖的寬度大於最大寬，設定目標寬等於最大寬
            // 高度按照寬度比例縮放
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
          } else {
            // 高度大於寬度，以高度為基準，按高度比例縮放
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
          }
        }

        // 設定canvas寬高
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        // 清除canvas並重繪(壓縮)
        context.clearRect(0, 0, targetWidth, targetHeight);
        context.drawImage(img, 0, 0, targetWidth, targetHeight);

        // 若沒設定預設則用原圖片副檔名
        const fileType = this.compress.defaultExt || file.type.split('/')[1];
        const base64String = canvas.toDataURL(`image/${fileType}`, 1.0);
        updateFiles(base64String, file.name, file.size, 'image');
      };
    },
  },
  created() {
    this.init();
    this.handleMessage({});
  },
};
</script>

<style lang="scss" scoped>
.upload-desc {
  color: $c-black;
  font-size: 12px;
  margin-bottom: 5px;
}

.video-box {
  display: inline-block;
  position: relative;
  width: 100px;
  height: 100px;
  margin-top: 10px;
  margin-right: 10px;
  border-radius: 6px;
  overflow: hidden;
}

.vidoe-cover {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: rgba($c-black, 0.5);
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
  z-index: 120;
  transform: translateX(-50%);
  width: 92px;
  height: 3px;
  background-color: rgba($c-black, 0.3);
  border-radius: 1.5px;
}

.ing-persent {
  width: 30%;
  height: 3px;
  background-color: $c-main;
  border-radius: 1.5px;
}

.re-upload {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 50%;
  z-index: 120;
  transform: translateX(-50%);
  width: 100px;
  height: 36px;
  background-color: rgba($c-black, 0.5);

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

.trigger-scope {
  display: inline-block;
}

.plus-box {
  text-align: center;

  &__icon {
    display: inline-block;
    position: relative;
    width: 40px;
    height: 40px;

    &::before {
      @include position(center);
      content: '';
      display: inline-block;
      width: 20px;
      height: 2px;
      background-color: $c-assist;
      border-radius: 1px;
    }

    &::after {
      @include position(center);
      content: '';
      display: inline-block;
      width: 2px;
      height: 20px;
      background-color: $c-assist;
      border-radius: 1px;
    }
  }
}

.file-input {
  display: none;
}

.label-cell {
  font-size: 14px;
  text-align: center;

  & + & {
    margin-top: 5px;
  }
}

.photo-box {
  width: 100px;
  height: 100px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 6px;
  overflow: hidden;
}

.error-wrapper {
  width: 100%;
  height: 16px;
  line-height: 16px;

  &__text {
    color: #f00;
    font-size: 12px;
  }
}

.preview-box-wrapper {
  width: 500px;
  margin-top: 10px;
}
</style>
