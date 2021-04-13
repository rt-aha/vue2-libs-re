function get(ctx) {
  const testData = [
    {
      id: 111,
      name: 'Roxy',
      age: 28,
      height: 153,
    },
    {
      id: 222,
      name: 'Ray',
      age: 27,
      height: 173,
    },
    {
      id: 333,
      name: 'Dean',
      age: 32,
      height: 175,
    },
    {
      id: 444,
      name: 'Jack',
      age: 29,
      height: 180,
      status: 'error',
    },
    // {
    //   id: 555,
    //   name: 'Yvonne',
    //   age: 27,
    //   height: 164,
    // },
    // {
    //   id: 666,
    //   name: 'Ivy',
    //   age: 24,
    //   height: 164,
    // },
    // {
    //   id: 777,
    //   name: 'David',
    //   age: 28,
    //   height: 178,
    // },

    // {
    //   id: 888,
    //   name: 'Joe',
    //   age: 29,
    //   height: 180,
    // },
    // {
    //   id: 999,
    //   name: 'Aren',
    //   age: 38,
    //   height: 176,
    // },
    // {
    //   id: 112312,
    //   name: 'Rosemary',
    //   age: 43,
    //   height: 165,
    // },
  ];

  ctx.body = testData;
}

export default get;
