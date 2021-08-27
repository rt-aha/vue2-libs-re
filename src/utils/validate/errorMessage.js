export const t1 = (args) => `t1 default error, args:${args}`;

export const t2 = () => 't2 default error';

export const vldRequired = (arg, options) => '此為必填選項';
export const vldRequiredWithLabel = (arg, options) => `請輸入${options.label}`;

export const vldLengthMoreThen = (args) => `長度需大於${args}位數`;
export const vldEmail = (args) => '請填寫正確格式的 Email';

export const vldAllEmail = (args) => '所有輸入框都必須符合 Email 格式';
export const vldOnlyOneAvatar = (args) => '請上傳一張照片';
