import testAuthList from '@/utils/testAuthList';
import genMenu from '@/router/genMenu';
import { routeMutation } from '@/observable/route';

export default {
  methods: {
    setMenuList: routeMutation.setMenuList,
    writeMenuList() {
      const token = true;
      if (token) {
        // testAuthList 由api取得
        const menuList = genMenu(testAuthList);
        this.setMenuList(menuList);
      }
    },
  },
};
