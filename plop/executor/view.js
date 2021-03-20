module.exports = function (plop) {
  // controller generator
  plop.setGenerator('comp', {
    description: 'create a view',
    prompts: [{
      type: 'input',
      name: 'folder',
      message: 'view folder',
    }, {
      type: 'input',
      name: 'name',
      message: 'view name',
    }],
    actions: [
      {
        type: 'add',
        path: '../../src/views/{{folder}}/{{name}}.vue',
        templateFile: '../component.hbs',
      },
    ],
  });
};
