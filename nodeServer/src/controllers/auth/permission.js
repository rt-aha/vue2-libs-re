function permission(ctx) {
  ctx.body = [
    {
      parentCode: 'A',
      subCode: 'A-1',
      permission: 4,
    },
    {
      parentCode: 'A',
      subCode: 'A-2',
      permission: 7,
    },
    {
      parentCode: 'B',
      subCode: 'B-1',
      permission: 7,
    },
    {
      parentCode: 'B',
      subCode: 'B-2',
      permission: 7,
    },
    {
      parentCode: 'B',
      subCode: 'B-3',
      permission: 7,
    },
    {
      parentCode: 'S',
      subCode: 'S-1',
      permission: 7,
    },
    {
      parentCode: 'S',
      subCode: 'S-2',
      permission: 7,
    },
  ];
}

export default permission;
