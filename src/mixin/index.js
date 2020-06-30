export default {
  methods: {
    validateForm(form) {
      let isPass = true;
      // 若有子組建才執行
      if (form.$children.length > 0) {
        // 迭代所有子組件
        for (let el of form.$children) {
          // 找cus-item-wrapper組件
          if (el.type === 'cus-wrapper') {
            // 迭代尋找輸入框，因為slot可能包含其他內容

            for (let input of el.$children) {
              // 找到 cus-input 表示是cus-input組件
              if (input.type === 'cus-input') {
                console.log('input.value', input.value);
                const result = el.validateValue(input.value);
                // 如果驗證有錯誤即驗證不過
                if (!result.isPass) {
                  isPass = result.isPass;
                }
              }
            }
          }
        }
      }

      return isPass;
    },
  },
};
