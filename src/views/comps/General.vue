<template>
  <div class="view-general">
    <re-title :mt="false" @click="handleClick('divider')">分隔線</re-title>
    <re-divider />

    <re-title @click="handleClick('upload')">上傳圖片/影片</re-title>
    <re-upload />

    <re-title @click="handleClick('uploadImage')">上傳圖片</re-title>
    <re-upload-image />
    <re-title @click="handleClick('uploadVideo')">上傳影片</re-title>
    <re-upload-video />

    <!-- 可以使用slot，也可以用把template傳入dialog -->
    <re-title @click="handleClick('dialog')">彈窗</re-title>
    <re-button @click="openDialog('slot')">開啟彈窗(slot)</re-button>
    <re-button @click="openDialog('prop')">開啟彈窗(prop)</re-button>
    <re-dialog :visible.sync="dialogVisible.slot" footerPosition="center">
      <template #header>
        <re-title type="dialog" :mt="false">彈窗標題 slot</re-title>
      </template>
      <template> body </template>
      <template #footer>
        <re-button @click="closeDialog('slot')">取消</re-button>
      </template>
    </re-dialog>

    <re-dialog
      :visible.sync="dialogVisible.prop"
      footerPosition="center"
      title="彈窗標題 prop"
      @beforeClose="beforeClose"
      :template="DialogTemplate"
      :data="{ a: 1, b: 2 }"
    />

    <re-title @click="handleClick('drawer')">抽屜</re-title>
    <re-button @click="openDrawer('slot')">開啟抽屜(slot)</re-button>
    <re-button @click="openDrawer('prop')">開啟抽屜(prop)</re-button>
    <re-drawer :visible.sync="drawerVisible.slot" footerPosition="center">
      <template #header>
        <re-title type="dialog" :mt="false">抽屜標題 slot</re-title>
      </template>
      <template> body </template>
      <template #footer>
        <re-button @click="closeDrawer('slot')">取消</re-button>
      </template>
    </re-drawer>

    <re-drawer
      :visible.sync="drawerVisible.prop"
      footerPosition="center"
      title="抽屜標題 prop"
      @beforeClose="beforeClose"
      :template="DrawerTemplate"
      :data="{ a: 1, b: 2 }"
    />

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

    <re-title @click="handleClick('dateTimePicker')">日期時間選擇器</re-title>
    <re-row>
      <re-date-time-picker v-model="val.dateTimePicker" />
    </re-row>

    <re-title @click="handleClick('pagination')">頁碼</re-title>
    <re-pagination :pageInfo="pageInfo" @handleJumpPage="handleJumpPage" />

    <re-title @click="handleClick('checkbox')">多選框</re-title>
    <div v-if="comps['checkbox']">
      <re-row>
        <re-checkbox-group v-model="val.checkbox1" :options="checkboxOptions" />
      </re-row>

      <re-row>
        <re-checkbox-group
          v-model="val.checkbox2"
          :options="checkboxOptions"
          :inline="false"
        />
      </re-row>

      <re-row>
        <re-checkbox
          v-model="val.checkAll"
          label="全選"
          @change="handleCheckbox"
        />
      </re-row>
      <re-row :style="{ 'margin-top': '0px' }">
        <re-checkbox-group v-model="val.checkbox3" :options="checkboxOptions" />
      </re-row>

      <re-row>
        <re-checkbox-group
          v-model="val.checkbox4"
          :options="limitedCheckboxOptions"
          :limit="[1, 3]"
        />
      </re-row>
    </div>

    <re-title @click="handleClick('radio')">單選框</re-title>
    <div v-if="comps['radio']">
      <re-row :mt="false">
        <re-radio v-model="val.radio1" :options="radioOptions" />
      </re-row>

      <re-row>
        <re-radio
          v-model="val.radio2"
          :options="radioOptions"
          :inline="false"
        />
      </re-row>
    </div>

    <re-title @click="handleClick('tabs')">頁籤</re-title>
    <re-tabs v-model="val.tab" @change="handleTab" :tabsConfig="tabsConfig">
      <template #tab111>content - tab111</template>
      <template #tab222>content - tab222</template>
      <template #tab333>content - tab333</template>
      <template #tab444>content - tab444</template>
      <template #tab555>content - tab555</template>
      <template #tab666>content - tab666</template>
    </re-tabs>

    <re-title @click="handleClick('button')">按鈕</re-title>
    <div v-if="comps['button']">
      <re-row :mt="false">
        <re-button> 預設按鈕 </re-button>
        <re-button :disabled="true"> disabled按鈕 </re-button>
        <re-button type="border"> border按鈕 </re-button>
        <re-button type="plain"> plain按鈕 </re-button>
      </re-row>
      <re-row>
        <re-button><template #prefix>pre</template>按鈕</re-button>
        <re-button>
          <template #prefix>pre</template>
          按鈕
          <template #suffix>suf</template>
        </re-button>
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
      <re-row>
        <re-button extra="circle">circle</re-button>
        <re-button bgColor="#CD5C5C">按紐</re-button>
        <re-button
          :style="{ 'border-color': '#CD5C5C', color: '#CD5C5C' }"
          type="border"
          >按紐</re-button
        >
      </re-row>
    </div>

    <re-title @click="handleClick('buttonGroup')">按鈕群組</re-title>
    <re-row>
      <re-button-group>
        <re-button> 讀 </re-button>
        <re-button> 寫 </re-button>
        <re-button> 寫 </re-button>
        <re-button> 刪 </re-button>
      </re-button-group>
    </re-row>

    <re-row>
      <re-button-group>
        <re-button type="border"> 讀 </re-button>
        <re-button type="border"> 寫 </re-button>
        <re-button type="border"> 寫 </re-button>
        <re-button type="border"> 刪 </re-button>
      </re-button-group>
    </re-row>

    <re-title @click="handleClick('input')">輸入框</re-title>
    <div v-if="comps['input']">
      <re-row :mt="false">
        <re-input v-model="val.input" placeholder="請輸入姓名" />
      </re-row>
      <re-row>
        <re-input v-model="val.input" :disabled="true" />
      </re-row>
      <re-row>
        <re-input v-model="val.inputPw" type="password" />
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

    <re-title @click="handleClick('inputNumber')">數字輸入框</re-title>
    <re-row>
      <re-input-number v-model="val.inputNumber1" placeholder="請輸入數字" />
    </re-row>
    <re-row>
      <re-input-number v-model="val.inputNumber2" step="2" />
    </re-row>
    <re-row>
      <re-input-number v-model="val.inputNumber2" size="small" />
    </re-row>

    <re-title @click="handleClick('textarea')">文本輸入框</re-title>
    <re-textarea v-model="val.textarea" disabled />

    <re-title @click="handleClick('switch')">開關</re-title>
    <div v-if="comps['switch']">
      <re-row :mt="false">
        <re-switch v-model="val.switch1" />
      </re-row>
      <re-row>
        <re-switch
          v-model="val.switch2"
          :switchLabel="{ on: '啟用', off: '關閉' }"
          :disabled="true"
        />
      </re-row>
    </div>

    <re-title @click="handleClick('inputList')">輸入框列表(可增減)</re-title>
    <re-input-list v-model="val.inputList" />

    <re-title @click="handleClick('tree')">樹型結構</re-title>
    <re-tree :treeList="treeList" />

    <re-title @click="handleClick('pagination')">頁碼</re-title>
    <re-pagination :pageInfo="pageInfo" @handleJumpPage="handleJumpPage" />

    <re-title @click="handleClick('tooltip')">文字提示</re-title>
    <div style="margin-left: 100px">
      <re-row>
        <re-tooltip position="top">
          <re-button>文字提示</re-button>
        </re-tooltip>
      </re-row>
      <re-row>
        <re-tooltip position="right">
          <re-button>文字提示</re-button>
        </re-tooltip>
      </re-row>

      <re-row>
        <re-tooltip position="left">
          <re-button>文字提示</re-button>
        </re-tooltip>
      </re-row>
      <re-row>
        <re-tooltip position="bottom">
          <re-button>文字提示</re-button>
        </re-tooltip>
      </re-row>
    </div>

    <re-title @click="handleClick('badge')">標記</re-title>
    <re-row>
      <re-badge>
        <re-button>按鈕</re-button>
      </re-badge>
    </re-row>

    <re-title @click="handleClick('select')">下拉選單</re-title>
    <div v-if="comps['select']">
      <re-row :mt="false">
        <re-select v-model="val.select1" :options="selectOptions" />
      </re-row>
      <re-row>
        <re-select
          v-model="val.select2"
          :options="selectOptions"
          :disabled="true"
        />
      </re-row>
    </div>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid';
import {
  selectOptions,
  radioOptions,
  checkboxOptions,
  treeList,
  limitedCheckboxOptions,
} from './test-config';
import TabsTesting from './TabsTesting.vue';
import DialogTemplate from './DialogTemplate.vue';
import DrawerTemplate from './DrawerTemplate.vue';

export default {
  name: 'General',
  data() {
    return {
      DialogTemplate,
      DrawerTemplate,
      comps: {
        button: true,
        buttonGroup: true,
        input: true,
        switch: true,
        select: true,
        radio: true,
        checkbox: true,
        datePicker: true,
        timePicker: true,
        dateTimePicker: true,
        tab: true,
        pagination: true,
        badge: true,
        tooltip: true,
        dialog: true,
        tree: true,
        inputList: true,
        inputNumber: true,
        textarea: true,
        upload: true,
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
        checkAll: true,
        checkbox3: [],
        checkbox4: [4],
        datePicker: new Date(),
        timePicker: new Date(),
        dateTimePicker: new Date(),
        tab: 'tab111',
        inputNumber1: '',
        inputNumber2: '',
        textarea: 'hihi',
        inputList: [
          {
            value: 'hello',
            id: uuid(),
          },
          {
            value: 'byebye',
            id: uuid(),
          },
        ],
      },
      pageInfo: {
        totalPage: 6,
        pageIndex: 1,
      },
      dialogVisible: {
        slot: false,
        prop: false,
      },
      drawerVisible: {
        slot: false,
        prop: false,
      },
      currTab: 'tab1',
      selectOptions,
      radioOptions,
      checkboxOptions,
      limitedCheckboxOptions,
      treeList,
      tabsConfig: [
        {
          label: 'tab111',
          name: 'tab111',
        },
        {
          label: 'tab222',
          name: 'tab222',
          disabled: true,
        },
        {
          label: 'tab333',
          name: 'tab333',
          render: {
            render(h) {
              return h('p', [h('span', 'render '), h('span', 'test')]);
            },
          },
        },
        {
          label: 'tab444',
          name: 'tab444',
        },
        {
          label: 'tab555',
          name: 'tab555',
        },

        {
          label: 'tab666',
          name: 'tab666',
        },
      ],
    };
  },
  methods: {
    beforeClose() {
      this.dialogVisible.prop = false;
    },
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
    openDialog(type) {
      console.log('openDialog');
      this.dialogVisible[type] = true;
    },
    closeDialog(type) {
      console.log('closeDialog');
      this.dialogVisible[type] = false;
    },
    openDrawer(type) {
      console.log('openDrawer');
      this.drawerVisible[type] = true;
    },
    closeDrawer(type) {
      console.log('closeDrawer');
      this.drawerVisible[type] = false;
    },
    removeInputList(id) {
      console.log('this.inputList', this.inputList);
      this.val.inputList = this.val.inputList.filter((item) => item.id !== id);
    },
    handleCheckbox(val) {
      if (val) {
        this.val.checkbox3 = this.checkboxOptions.map((ele) => ele.value);
      } else {
        this.val.checkbox3 = [];
      }
    },
    setCheckAll() {
      if (this.val.checkAll) {
        this.val.checkbox3 = this.checkboxOptions.map((ele) => ele.value);
      }
    },
  },
  created() {
    this.setCheckAll();
  },
};
</script>

<style lang="scss">
.view-general {
  @include box-padding(10px);
}
</style>
