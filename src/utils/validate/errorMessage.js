export const t1 = (args) => `t1 default error, args:${args}`;

export const t2 = () => 't2 default error';

export const vldRequired = (arg, options) => '此為必填選項';
export const vldRequiredWithLabel = (arg, options) => `請輸入${options.label}`;

export const vldLengthMoreThen = (args) => `長度需大於${args}位數`;
