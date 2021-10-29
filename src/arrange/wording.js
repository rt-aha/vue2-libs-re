import { v4 as uuid } from 'uuid';

export const idCard = {
  textList: [
    {
      uuid: uuid(),
      text: '需要年滿二十歲之成年人',
    },
    {
      uuid: uuid(),
      text: '負責人不能為公務人員身分',
    },
    {
      uuid: uuid(),
      text: '如負責人領有政府各項補助款，或退休金補助之事項者，應先與各補助核發單位確認，當負責人後補助會不會被取消',
    },
  ],
};

export const idCardSample = {
  textList: [
    {
      uuid: uuid(),
      text: '證件上的文字與照片須清晰',
    },
    {
      uuid: uuid(),
      text: '在光線充足環境下拍攝，請避開燈光反射',
    },
    {
      uuid: uuid(),
      text: '盡可能以正面拍攝，勿歪斜',
    },
    {
      uuid: uuid(),
      text: '若您希望壓文字在照片上，請壓「公司設立使用」',
    },
    {
      uuid: uuid(),
      text: '如果您同時有要申請「勞健保單位設立」等其他服務，建議不要壓文字，方便未來幫您送件',
    },
  ],
};

export const healthIdCard = {
  textList: [
    {
      uuid: uuid(),
      text: '因應洗錢防制等相關規定，負責人健保卡主要用於「公司法 22-1 條公司負責人及主要股東資訊申報」',
    },
    {
      uuid: uuid(),
      text: '提醒您，健保卡正面的卡號需要清晰可讀喔！',
    },
  ],
};

export const healthIdCardSample = {
  textList: [
    {
      uuid: uuid(),
      text: '證件上的文字與照片須清晰',
    },
    {
      uuid: uuid(),
      text: '在光線充足環境下拍攝，請避開燈光反射',
    },
    {
      uuid: uuid(),
      text: '盡可能以正面拍攝，勿歪斜',
    },
    {
      uuid: uuid(),
      text: '若您希望壓文字在照片上，請壓「公司設立使用」',
    },
  ],
};

export const capitalUnlimited = {
  textList: [
    {
      uuid: uuid(),
      text: '現已廢除最低資本額限制，因此設定多少都沒有關係',
    },
    {
      uuid: uuid(),
      text: '若沒有要用發票的話（預計申請小規模營業人），建議設個 3 萬就好',
    },
    {
      uuid: uuid(),
      text: '如果要使用發票，可以設在 20 萬',
    },
    {
      uuid: uuid(),
      text: '行號資本額 25 萬以內，不需做資本證明',
    },
  ],
};

export const coLtd = {
  textList: [
    {
      uuid: uuid(),
      text:
        '您申請的是「股份有限公司」，股份有限公司至少需要找好一位董事、一位監察人，兩位「可以是、也可以不是」股東。',
    },
    {
      uuid: uuid(),
      text: '如果是沒有擁有股份的董事或監察人(外聘董事、外聘監察人)，則在出資額上寫 0 即可。',
    },
    {
      uuid: uuid(),
      text: '全部股東的出資額加總起來應等於公司的「資本額」',
    },
  ],
};

export const ltd = {
  textList: [
    {
      uuid: uuid(),
      text: '如果是一人公司，股東1的地方留白即可',
    },
    {
      uuid: uuid(),
      text: '全部股東的出資額加總起來應等於公司的「資本額」',
    },
    {
      uuid: uuid(),
      text:
        '董事建議設負責人一人即可，因為有限公司進行進行變更登記都要全體股東同意，多設董事，若違反公司法，依照董事人數進行開罰，兩人即罰兩倍，依此類推。',
    },
  ],
};

// 行號
export const normalCompany = {
  textList: [
    {
      uuid: uuid(),
      text: '如果股東為多位，請提供所有股東的「姓名」以及「出資額」',
    },
    {
      uuid: uuid(),
      text: '全部股東的出資額加總起來應等於公司的「資本額」',
    },
    {
      uuid: uuid(),
      text: '如果您要申請小規模營業人，建議獨資申請',
    },
  ],
};

export const recordAddress = {
  textList: [
    {
      uuid: uuid(),
      render: () => ({
        render(h) {
          return h('p', {}, [
            h('span', {}, '房屋稅單影本需為'),
            h('span', { style: { color: '#ff7b4a' } }, '最新一期110年度'),
            h('span', {}, '，並提供有戳章頁'),
          ]);
        },
      }),
    },
    {
      uuid: uuid(),
      text: '如購買新屋檢附契稅或是免繳房屋稅，請附房屋稅籍證明書',
    },
    {
      uuid: uuid(),
      text: '此文件請房東或是建物所有權人提供',
    },
  ],
};

export const homeTaxSample = {
  textList: [
    {
      uuid: uuid(),
      text: '證件上的文字與照片須清晰',
    },
    {
      uuid: uuid(),
      text: '在光線充足環境下拍攝，請避開燈光反射',
    },
    {
      uuid: uuid(),
      text: '盡可能以正面拍攝，勿歪斜',
    },
    {
      uuid: uuid(),
      text: '若您希望壓文字在照片上，請壓「公司設立使用」',
    },
  ],
};

export const homeBelong = {
  textList: [
    {
      uuid: uuid(),
      text: '如果房屋所有權人為兩人以上',
    },
    {
      uuid: uuid(),
      text: '如果房東僅有一人，提供房屋稅單影本即可、不需提供建物所有權狀',
    },
    {
      uuid: uuid(),
      text: '如果房屋稅單上無加註樓層，但希望登記樓層者',
    },
    {
      uuid: uuid(),
      text:
        '例如房東擁有整棟不動產，但公司實際上只租用其中一層；或是使用親友不動產，希望降低從住宅用變成營業用的比例，提供建物所有權狀，可以限定樓層，將只有其中一層稅率變更成營業用',
    },
  ],
};

export const buildBelongSample = {
  textList: [
    {
      uuid: uuid(),
      text: '證件上的文字與照片須清晰',
    },
    {
      uuid: uuid(),
      text: '在光線充足環境下拍攝，請避開燈光反射',
    },
    {
      uuid: uuid(),
      text: '盡可能以正面拍攝，勿歪斜',
    },
    {
      uuid: uuid(),
      text: '若您希望壓文字在照片上，請壓「公司設立使用」',
    },
  ],
};

export const usedCondition = {
  textList1: [
    {
      uuid: uuid(),
      text: '工商憑證類似「企業版的自然人憑證」',
    },
    {
      uuid: uuid(),
      text: '用途廣泛，包含：電子發票授權作業、線上辦理勞健保、查詢繳費單或線上申辦稅務資料、部分行業食品藥物登記等。',
    },
    {
      uuid: uuid(),
      text: '免費協助工商憑證開卡與授權。',
    },
    {
      uuid: uuid(),
      text: '可使用 Simpany 獨家進項總表、電子發票、代辦勞健保加退保等服務。',
    },
  ],
  textList2: [
    {
      uuid: uuid(),
      text: '工商憑證類似「企業版的自然人憑證」',
    },
    {
      uuid: uuid(),
      text: '用途廣泛，包含：電子發票授權作業、線上辦理勞健保、查詢繳費單或線上申辦稅務資料、部分行業食品藥物登記等。',
    },
    {
      uuid: uuid(),
      text: '須自行進行工商憑證開卡。',
    },
    {
      uuid: uuid(),
      text: '無法使用 Simpany 獨家進項總表、電子發票、代辦勞健保加退保等服務。',
    },
  ],
  textList3: [
    {
      uuid: uuid(),
      text: '註冊公司正式英文名稱',
    },
    {
      uuid: uuid(),
      text: '可以收國外客戶款項',
    },
    {
      uuid: uuid(),
      text: '可以做進出口貿易',
    },
    {
      uuid: uuid(),
      text: '服務費 1,500 元',
    },
    {
      uuid: uuid(),
      text: '請輸入預計使用的英文名稱',
    },
  ],
};

export const laborUnitCreate = {
  textList1: [
    {
      uuid: uuid(),
      text: '只有負責人一人、無員工',
    },
    {
      uuid: uuid(),
      text: '健保屬於強制加保，負責人沒有投保在其他公司，都需要加保在自己公司',
    },
    {
      uuid: uuid(),
      text: '服務費 500 元',
    },
  ],
  textList2: [
    {
      uuid: uuid(),
      render: () => ({
        render(h) {
          return h(
            'span',
            { class: 'desc-list__item__text', style: { 'font-weight': 700 } },
            '至少要有一位員工才能成立勞保投保單位',
          );
        },
      }),
    },
    {
      uuid: uuid(),
      text: '公司設立完成後，客服人員會再與您索取欲加保的員工資料',
    },
    {
      uuid: uuid(),
      text: '服務費 1,000 元',
    },
  ],
};
