import { testAuthList } from '@/utils/authFormat';
import account from '@/router/account';
import setting from '@/router/setting';
import { cloneDeep } from 'lodash';

const parentCodeList = testAuthList.map((ele) => ele.parentCode);
const parentCode = new Set(parentCodeList);
const subCodeList = testAuthList.map((ele) => ele.subCode);

//
const viewsMapping = {
  A: account,
  B: setting,
};

const menuOrder = [];

parentCode.forEach((code) => {
  if (code in viewsMapping) {
    const cloneMenu = cloneDeep(viewsMapping[code]);

    const menuChildren = [];
    cloneMenu[0].children.forEach((route) => {
      if (subCodeList.includes(route.meta.authCode)) {
        menuChildren.push(route);
      }
    });
    cloneMenu[0].children = menuChildren;
    menuOrder.push(...cloneMenu);
  }
});

menuOrder.sort((a, b) => {
  if (a.meta.order < b.meta.order) return -1;
  if (a.meta.order > b.meta.order) return 1;
  return 0;
});

// 若不需要權限，直接渲染下面這個
// const menuOrder = {
//   ...account,
//   ...setting
// }

export default menuOrder;
