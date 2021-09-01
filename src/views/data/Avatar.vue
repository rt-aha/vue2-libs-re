<template>
  <div class="page-avatar">
    <re-dev-sheet>
      <re-dev-desc>基本使用，尺寸：預設</re-dev-desc>
      <re-avatar src="https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png" />
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>尺寸：小</re-dev-desc>
      <re-avatar size="small" src="https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png" />
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>尺寸：大</re-dev-desc>
      <re-avatar size="large" src="https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png" />
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>自訂尺寸大小</re-dev-desc>
      <re-avatar src="https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png" customSize="100px" />
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>預設沒圖片時</re-dev-desc>
      <re-avatar size="large" />
    </re-dev-sheet>
    <re-dev-sheet>
      <re-dev-desc>自訂沒圖片時的預設圖片</re-dev-desc>
      <re-avatar size="large" :defaultAvatar="defaultAvatar" />
    </re-dev-sheet>

    <re-dev-sheet>
      <re-dev-desc>用名字第一個字開頭英文</re-dev-desc>
      <re-avatar size="small" name="Vicky" />
    </re-dev-sheet>
  </div>
</template>

<script>
import defaultAvatar from '@/devComponents/avatar/defaultAvatar.svg';

export default {
  name: 'PageAvatar',
  data() {
    return {
      defaultAvatar,
    };
  },
};
</script>

<style lang="scss" scoped></style>
