<template>
  <div class="view-general">
    <re-title :mt="false" @click="handleClick('tabs')">頁籤</re-title>
    <re-tabs v-model="val.tab" @change="handleTab">
      <re-tab-pane v-for="tab of tabsConfig"
        :key="tab.name"
       :label="tab.label"
       :name="tab.name">{{tab.name}}</re-tab-pane>

    </re-tabs>
    <re-title  @click="handleClick('divider')">分隔線</re-title>
    <re-divider />

    <re-title  @click="handleClick('uploadImage')">上傳圖片</re-title>
    <re-upload-image />
    <re-title  @click="handleClick('uploadVideo')">上傳影片</re-title>
    <re-upload-video />

    <re-title @click="handleClick('pagination')">頁碼</re-title>
    <re-pagination :pageInfo="pageInfo" @handleJumpPage="handleJumpPage"/>

    <re-title @click="handleClick('badge')">標記</re-title>
    <re-badge>
      <re-button>按鈕</re-button>
    </re-badge>

    <re-title @click="handleClick('dialog')">彈窗</re-title>
    <re-button @click="openDialog()">開啟彈窗</re-button>
    <re-dialog :visible="dialogVisible" footerPosition="center" @close="closeDialog">
      <template #header>
        <re-title type="dialog" :mt="false">彈窗標題</re-title>
      </template>
      <template>
        body
      </template>

      <template #footer>
        <re-button>取消</re-button>
      </template>
    </re-dialog>

    <re-title  @click="handleClick('button')">按鈕</re-title>
    <div v-if="comps['button']">
      <re-row :mt="false">
        <re-button> 預設按鈕 </re-button>
        <re-button :disabled="true"> disabled按鈕 </re-button>
        <re-button type="border"> border按鈕 </re-button>
        <re-button type="plain"> plain按鈕 </re-button>
      </re-row>
      <re-row>
        <re-button><template #prefix>pre</template>按鈕</re-button>
        <re-button><template #prefix>pre</template>按鈕<template #suffix>suf</template></re-button>
        <re-button>預設按鈕<template #suffix>suf</template></re-button>
      </re-row>
      <re-row>
        <re-button>字很長很長很長很長的按鈕</re-button>
        <re-button size="small"> 小按鈕 </re-button>
      </re-row>
      <re-row>
        <re-button :isLoading="true">按紐</re-button>
        <re-button :isLoading="true" type="border"> border按鈕 </re-button>
        <re-button :isLoading="true" type="plain"> plain按鈕 </re-button>
        <re-button :isLoading="true" size="small"> 小按鈕 </re-button>
      </re-row>
    </div>

    <re-title @click="handleClick('input')">輸入框</re-title>
    <div v-if="comps['input']">
      <re-row :mt="false">
        <re-input v-model="val.input" />
      </re-row>
      <re-row>
        <re-input v-model="val.input" :disabled="true"/>
      </re-row>
      <re-row>
        <re-input v-model="val.inputPw" type="password"/>
      </re-row>
      <re-row>
        <re-input v-model="val.input">
          <template #prepend>https://</template>
          <template #prefix>p</template>
          <template #suffix>s</template>
          <template #append>a</template>
        </re-input>
      </re-row>
    </div>

    <re-title @click="handleClick('switch')">開關</re-title>
    <div v-if="comps['switch']">
      <re-row :mt="false">
        <re-switch v-model="val.switch1"  />
      </re-row>
      <re-row>
        <re-switch v-model="val.switch2" :switchLabel="{on: '啟用', off: '關閉'}" :disabled="true"/>
      </re-row>
    </div>

    <re-title @click="handleClick('select')">下拉選單</re-title>
    <div v-if="comps['select']">
      <re-row :mt="false">
        <re-select v-model="val.select1" :options="selectOptions" />
      </re-row>
      <re-row>
        <re-select v-model="val.select2" :options="selectOptions" :disabled="true"/>
      </re-row>
    </div>

    <re-title @click="handleClick('radio')">單選框</re-title>
    <div v-if="comps['radio']">
      <re-row :mt="false">
        <re-radio v-model="val.radio1" :options="radioOptions" />
      </re-row>

      <re-row>
        <re-radio v-model="val.radio2" :options="radioOptions" :inline="false" />
      </re-row>
    </div>

    <re-title @click="handleClick('checkbox')">多選框</re-title>
    <div v-if="comps['checkbox']">
      <re-row>
        <re-checkbox v-model="val.checkbox1" :options="checkboxOptions" />
      </re-row>

      <re-row>
        <re-checkbox v-model="val.checkbox2" :options="checkboxOptions" :inline="false" />
      </re-row>
    </div>

    <re-title @click="handleClick('datePicker')">日期選擇器</re-title>
    <div v-if="comps['datePicker']">
      <re-row>
        <re-date-picker v-model="val.datePicker" />
      </re-row>

    </div>

    <re-title @click="handleClick('timePicker')">時間選擇器</re-title>
    <div v-if="comps['timePicker']">
      <re-row>
        <re-time-picker v-model="val.timePicker" />
      </re-row>
    </div>
  </div>
</template>

<script>
import { selectOptions, radioOptions, checkboxOptions } from './test-config';
import TabsTesting from './TabsTesting.vue';

export default {
  name: 'General',
  data() {
    return {
      comps: {
        button: true,
        input: true,
        switch: true,
        select: true,
        radio: true,
        checkbox: true,
        datePicker: true,
        timePicker: true,
        tab: true,
        pagination: true,
        badge: true,
        dialog: true,
      },
      val: {
        input: 'input-val',
        inputPw: 'input-val',
        switch1: true,
        switch2: false,
        select1: 5,
        select2: 2,
        radio1: 2,
        radio2: 3,
        checkbox1: [2],
        checkbox2: [1, 4, 5],
        datePicker: '',
        timePicker: '01:01:40',
        tab: 'tab111',
      },
      pageInfo: {
        totalPage: 10,
        pageIndex: 1,
      },
      dialogVisible: true,
      currTab: 'tab1',
      selectOptions,
      radioOptions,
      checkboxOptions,
      tabsConfig: [
        {
          label: 'tab122',
          name: 'tab111',
        },
        {
          label: 'tab222',
          name: 'tab222',
        },
        {
          label: 'tab333',
          name: 'tab333',
        },
      ],
    };
  },
  methods: {
    handleClick(type) {
      this.comps[type] = !this.comps[type];
    },
    handleTab(tabInfo) {
      this.val.tab = tabInfo.name;
    },
    handleJumpPage(pageIndex) {
      console.log('pageIndex', pageIndex);
      this.pageInfo.pageIndex = pageIndex;
    },
    openDialog() {
      console.log('openDialog');
      this.dialogVisible = true;
    },
    closeDialog() {
      console.log('closeDialog');
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss">
.view-general {
  @include box-padding(10px);
}
</style>
