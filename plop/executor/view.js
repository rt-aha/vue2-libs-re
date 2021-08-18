module.exports = function (plop) {
  // controller generator
  plop.setGenerator('folder', {
    description: 'create a view',
    prompts: [
      {
        type: 'input',
        name: 'folder',
        message: 'view folder',
      },
      {
        type: 'input',
        name: 'name',
        message: 'view name',
      },
      {
        type: 'input',
        name: 'kebabName',
        message: 'kebab name',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../../src/views/{{folder}}/{{name}}.vue',
        templateFile: '../view.hbs',
      },
    ],
  });
};
